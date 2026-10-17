create extension if not exists pgcrypto;

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  display_name text not null
    check (char_length(display_name) between 2 and 80),
  relationship text not null default ''
    check (char_length(relationship) <= 80),
  quote text not null
    check (char_length(quote) between 20 and 1000),
  consented_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

grant select on public.testimonials to anon, authenticated;

drop policy if exists "Public can read school testimonials"
  on public.testimonials;

create policy "Public can read school testimonials"
  on public.testimonials
  for select
  to anon, authenticated
  using (true);

create table if not exists public.website_submission_limits (
  ip_fingerprint text primary key,
  window_started_at timestamptz not null default now(),
  submission_count integer not null default 1
    check (submission_count > 0)
);

alter table public.website_submission_limits enable row level security;

create or replace function public.take_website_submission_slot(
  client_fingerprint text
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  accepted boolean;
begin
  delete from public.website_submission_limits
  where window_started_at < now() - interval '1 day';

  insert into public.website_submission_limits (
    ip_fingerprint,
    window_started_at,
    submission_count
  )
  values (client_fingerprint, now(), 1)
  on conflict (ip_fingerprint) do update
  set
    window_started_at = case
      when website_submission_limits.window_started_at < now() - interval '15 minutes'
        then now()
      else website_submission_limits.window_started_at
    end,
    submission_count = case
      when website_submission_limits.window_started_at < now() - interval '15 minutes'
        then 1
      else website_submission_limits.submission_count + 1
    end
  where website_submission_limits.window_started_at < now() - interval '15 minutes'
    or website_submission_limits.submission_count < 6
  returning true into accepted;

  return coalesce(accepted, false);
end;
$$;

revoke all on function public.take_website_submission_slot(text)
  from public, anon, authenticated;
grant execute on function public.take_website_submission_slot(text)
  to service_role;
