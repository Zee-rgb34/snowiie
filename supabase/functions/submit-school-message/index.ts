const inbox = "director.snowwhiteschools@gmail.com";
const securityHeaders = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json",
  "Vary": "Origin",
  "X-Content-Type-Options": "nosniff",
};

function getAllowedOrigin() {
  const configuredOrigin = Deno.env.get("ALLOWED_ORIGIN")?.replace(/\/+$/, "");
  if (!configuredOrigin) return null;

  try {
    const url = new URL(configuredOrigin);
    const isLocalDevelopment =
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(url.hostname);

    if (
      url.origin !== configuredOrigin ||
      (url.protocol !== "https:" && !isLocalDevelopment)
    ) {
      return null;
    }

    return url.origin;
  } catch {
    return null;
  }
}

function responseHeaders(origin: string | null) {
  const headers = new Headers(securityHeaders);
  const allowedOrigin = getAllowedOrigin();

  if (origin && allowedOrigin && origin === allowedOrigin) {
    headers.set("Access-Control-Allow-Origin", allowedOrigin);
    headers.set(
      "Access-Control-Allow-Headers",
      "authorization, x-client-info, apikey, content-type"
    );
    headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    headers.set("Access-Control-Max-Age", "600");
  }

  return headers;
}

function respond(
  status: number,
  body: Record<string, unknown>,
  headers: HeadersInit = securityHeaders
) {
  return new Response(JSON.stringify(body), {
    status,
    headers,
  });
}

function clean(value: unknown, limit: number) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, limit);
}

async function readJsonBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("missing-body");

  const chunks: Uint8Array[] = [];
  let byteLength = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;

    byteLength += value.byteLength;
    if (byteLength > 10000) {
      await reader.cancel();
      throw new RangeError("body-too-large");
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(byteLength);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return JSON.parse(new TextDecoder().decode(bytes)) as unknown;
}

async function sendEmail(subject: string, text: string) {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const sender = Deno.env.get("SENDER_EMAIL");

  if (!apiKey || !sender) {
    throw new Error("Email delivery is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [inbox],
      subject,
      text,
    }),
  });

  if (!response.ok) {
    console.error("Email provider rejected a school website notification.");
    throw new Error("The school could not be notified by email.");
  }
}

async function withinSubmissionLimit(request: Request) {
  const address =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip");
  const projectUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!projectUrl || !serviceRoleKey) {
    throw new Error("Submission service is not configured.");
  }

  if (!address) {
    throw new Error("Could not verify the submission limit.");
  }

  const fingerprintBuffer = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(address)
  );
  const fingerprint = Array.from(new Uint8Array(fingerprintBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  const response = await fetch(
    `${projectUrl.replace(/\/+$/, "")}/rest/v1/rpc/take_website_submission_slot`,
    {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ client_fingerprint: fingerprint }),
    }
  );

  if (!response.ok) {
    console.error("Could not check the school form submission limit.");
    throw new Error("Submissions are temporarily unavailable.");
  }

  return response.json();
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");
  const headers = responseHeaders(origin);
  const allowedOrigin = getAllowedOrigin();

  if (!allowedOrigin) {
    return respond(
      503,
      { error: "The website submission service is not configured." },
      headers
    );
  }

  if (!origin || origin !== allowedOrigin) {
    return respond(403, { error: "This website origin is not allowed." }, headers);
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (request.method !== "POST") {
    return respond(405, { error: "Use POST to submit a message." }, headers);
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return respond(415, { error: "Send form data as JSON." }, headers);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 10000) {
    return respond(413, { error: "The submitted message is too large." }, headers);
  }

  let body: Record<string, unknown>;
  try {
    const parsedBody = await readJsonBody(request);
    if (
      typeof parsedBody !== "object" ||
      parsedBody === null ||
      Array.isArray(parsedBody)
    ) {
      return respond(400, { error: "Please check the submitted information." }, headers);
    }
    body = parsedBody as Record<string, unknown>;
  } catch (error) {
    if (error instanceof RangeError) {
      return respond(413, { error: "The submitted message is too large." }, headers);
    }
    return respond(400, { error: "Please check the submitted information." }, headers);
  }

  if (clean(body.website, 200)) {
    return respond(200, { ok: true }, headers);
  }

  if (body.type === "contact") {
    const name = clean(body.name, 80);
    const email = clean(body.email, 254);
    const topic = clean(body.topic, 80);
    const message = clean(body.message, 5000);

    if (
      name.length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !["Admissions", "Arrange a visit", "School information", "Other"].includes(topic) ||
      message.length < 10
    ) {
      return respond(400, {
        error: "Please provide a valid name, email, topic, and message.",
      }, headers);
    }

    try {
      if (!(await withinSubmissionLimit(request))) {
        return respond(429, {
          error: "Too many submissions. Please wait a little before trying again.",
        }, headers);
      }

      await sendEmail(
        `Website enquiry: ${topic}`,
        `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`
      );
      return respond(200, { ok: true }, headers);
    } catch (error) {
      console.error("Could not deliver a school enquiry email.");
      return respond(502, {
        error: error instanceof Error
          ? error.message
          : "Your message could not be sent. Please try again.",
      }, headers);
    }
  }

  if (body.type === "testimonial") {
    const displayName = clean(body.displayName, 80);
    const relationship = clean(body.relationship, 80);
    const quote = clean(body.quote, 1000);

    if (
      displayName.length < 2 ||
      quote.length < 20 ||
      body.consent !== true
    ) {
      return respond(400, {
        error: "Please add your name, a testimonial, and public display consent.",
      }, headers);
    }

    const projectUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!projectUrl || !serviceRoleKey) {
      return respond(503, {
        error: "Testimonials cannot be shared right now. Please try again later.",
      }, headers);
    }

    let insertResponse: Response;
    try {
      if (!(await withinSubmissionLimit(request))) {
        return respond(429, {
          error: "Too many submissions. Please wait a little before trying again.",
        }, headers);
      }

      insertResponse = await fetch(
        `${projectUrl}/rest/v1/testimonials`,
        {
          method: "POST",
          headers: {
            apikey: serviceRoleKey,
            Authorization: `Bearer ${serviceRoleKey}`,
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            display_name: displayName,
            relationship,
            quote,
          }),
        }
      );
    } catch {
      return respond(502, {
        error: "Your testimonial could not be published. Please try again.",
      }, headers);
    }

    if (!insertResponse.ok) {
      console.error("Could not publish a school testimonial.");
      return respond(502, {
        error: "Your testimonial could not be published. Please try again.",
      }, headers);
    }

    let notificationSent = true;
    try {
      await sendEmail(
        "A new school testimonial was shared",
        `Name: ${displayName}\nConnection to the school: ${relationship || "Not provided"}\n\n${quote}`
      );
    } catch {
      notificationSent = false;
    }

    return respond(200, { ok: true, published: true, notificationSent }, headers);
  }

  if (body.type === "newsletter") {
    const submittedEmail = clean(body.email, 255);
    const email = submittedEmail.toLowerCase();

    if (
      submittedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return respond(400, { error: "Please provide a valid email address." }, headers);
    }

    const projectUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!projectUrl || !serviceRoleKey) {
      return respond(503, {
        error: "Subscriptions are unavailable right now. Please try again later.",
      }, headers);
    }

    try {
      if (!(await withinSubmissionLimit(request))) {
        return respond(429, {
          error: "Too many submissions. Please wait a little before trying again.",
        }, headers);
      }

      const response = await fetch(
        `${projectUrl.replace(/\/+$/, "")}/rest/v1/newsletter_subscribers?on_conflict=email`,
        {
          method: "POST",
          headers: {
            apikey: serviceRoleKey,
            Authorization: ["Bearer", serviceRoleKey].join(" "),
            "Content-Type": "application/json",
            Prefer: "resolution=ignore-duplicates,return=minimal",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        console.error("Could not store a school newsletter subscription.");
        return respond(502, {
          error: "Your subscription could not be saved. Please try again.",
        }, headers);
      }

      return respond(200, { ok: true, subscribed: true }, headers);
    } catch {
      console.error("Could not process a school newsletter subscription.");
      return respond(502, {
        error: "Your subscription could not be saved. Please try again.",
      }, headers);
    }
  }

  return respond(400, { error: "Choose a valid message type." }, headers);
});
