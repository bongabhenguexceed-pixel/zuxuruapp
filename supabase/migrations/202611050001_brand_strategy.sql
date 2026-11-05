-- BONGA BHENGU OS: Brand HQ
-- Additive migration. Creates a dedicated strategy record per business workspace.
create table if not exists public.brand_strategy (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null unique references public.businesses(id) on delete cascade,
  mission text not null default '',
  vision text not null default '',
  positioning text not null default '',
  target_audience text not null default '',
  brand_promise text not null default '',
  brand_values text[] not null default '{}',
  brand_voice text not null default '',
  content_pillars text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.brand_strategy enable row level security;
drop policy if exists "Business owners manage brand strategy" on public.brand_strategy;
create policy "Business owners manage brand strategy"
on public.brand_strategy for all
using (exists (
  select 1 from public.businesses b
  where b.id = brand_strategy.business_id and b.owner_id = auth.uid()
))
with check (exists (
  select 1 from public.businesses b
  where b.id = brand_strategy.business_id and b.owner_id = auth.uid()
));
create index if not exists brand_strategy_business_id_idx
on public.brand_strategy(business_id);
