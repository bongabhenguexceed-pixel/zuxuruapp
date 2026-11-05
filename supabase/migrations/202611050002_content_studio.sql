-- BONGA BHENGU OS: Content Studio
-- Separate table to avoid making assumptions about any existing content_items table.
create table if not exists public.brand_content (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  title text not null,
  content_body text not null default '',
  content_type text not null default 'post' check (content_type in ('post','article','video','story','email','other')),
  platform text not null default 'unspecified',
  content_pillar text not null default '',
  status text not null default 'idea' check (status in ('idea','draft','ready','published','archived')),
  scheduled_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists brand_content_business_created_idx
on public.brand_content(business_id, created_at desc);
create index if not exists brand_content_business_status_idx
on public.brand_content(business_id, status);
alter table public.brand_content enable row level security;
drop policy if exists "Business owners manage brand content" on public.brand_content;
create policy "Business owners manage brand content"
on public.brand_content for all
using (exists (
 select 1 from public.businesses b
 where b.id = brand_content.business_id and b.owner_id = auth.uid()
))
with check (exists (
 select 1 from public.businesses b
 where b.id = brand_content.business_id and b.owner_id = auth.uid()
));
