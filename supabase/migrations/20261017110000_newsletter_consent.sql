alter table public.newsletter_subscribers
  add column if not exists consented_at timestamptz;

alter table public.newsletter_subscribers
  alter column consented_at set default now();
