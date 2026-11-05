-- BONGA BHENGU OS: CRM & Audience HQ
-- Dedicated table; does not alter any existing contacts table.
create table if not exists public.brand_audience_contacts (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  full_name text not null,
  email text not null default '',
  phone text not null default '',
  organisation text not null default '',
  audience_segment text not null default 'general',
  lead_priority text not null default 'normal' check (lead_priority in ('low','normal','high','urgent')),
  relationship_status text not null default 'new' check (relationship_status in ('new','contacted','qualified','customer','inactive')),
  source text not null default '',
  notes text not null default '',
  follow_up_at timestamptz,
  last_contacted_at timestamptz,
  email_marketing_consent boolean not null default false,
  whatsapp_marketing_consent boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists brand_audience_contacts_business_created_idx
on public.brand_audience_contacts(business_id, created_at desc);
create index if not exists brand_audience_contacts_business_followup_idx
on public.brand_audience_contacts(business_id, follow_up_at);
alter table public.brand_audience_contacts enable row level security;
drop policy if exists "Business owners manage audience contacts" on public.brand_audience_contacts;
create policy "Business owners manage audience contacts"
on public.brand_audience_contacts for all
using (exists (
 select 1 from public.businesses b
 where b.id = brand_audience_contacts.business_id and b.owner_id = auth.uid()
))
with check (exists (
 select 1 from public.businesses b
 where b.id = brand_audience_contacts.business_id and b.owner_id = auth.uid()
));
