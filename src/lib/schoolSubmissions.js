const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function requireSupabaseConfig() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "This form is temporarily unavailable. Please contact the school directly."
    );
  }
}

export async function getTestimonials() {
  requireSupabaseConfig();

  const response = await fetch(
    `${supabaseUrl}/rest/v1/testimonials?select=id,display_name,relationship,quote,created_at&order=created_at.desc&limit=50`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Testimonials are unavailable right now. Please contact the school directly."
    );
  }

  return response.json();
}

export async function submitSchoolMessage(message) {
  requireSupabaseConfig();

  const response = await fetch(
    `${supabaseUrl}/functions/v1/submit-school-message`,
    {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.error || "Your message could not be sent. Please try again."
    );
  }

  return result;
}
