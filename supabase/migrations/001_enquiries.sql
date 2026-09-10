create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 100),
  phone text not null check (char_length(trim(phone)) between 7 and 20),
  email text null,
  message text not null check (char_length(trim(message)) between 3 and 2000),
  created_at timestamptz not null default now()
);

alter table public.enquiries enable row level security;

drop policy if exists "Anyone can submit enquiries" on public.enquiries;
create policy "Anyone can submit enquiries"
on public.enquiries
for insert
to anon, authenticated
with check (
  char_length(trim(name)) between 2 and 100
  and char_length(trim(phone)) between 7 and 20
  and char_length(trim(message)) between 3 and 2000
);

drop policy if exists "No public enquiry reads" on public.enquiries;
-- Intentionally no SELECT policy. Visitors cannot read enquiries.
