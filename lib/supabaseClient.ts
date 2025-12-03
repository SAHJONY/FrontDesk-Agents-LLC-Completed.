-- ============================
-- FrontDesk Agents – Supabase Schema
-- Archivo: frontdesk_supabase_schema.sql
-- ============================

-- EXTENSIONES (por si no están)
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================
-- TABLAS BASE
-- ============================

-- 1) Tenants (clientes/negocios)
create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  industry text,
  website text,
  demo_phone text,          -- teléfono del negocio
  fda_number text,          -- número asignado (Bland/Twilio)
  timezone text default 'America/Chicago',
  plan_id uuid,             -- referencia a plans.id
  status text default 'trial', -- trial | active | paused | cancelled
  mrr_usd numeric(10,2) default 0,
  created_at timestamptz default now()
);

-- 2) Usuarios del tenant
create table if not exists public.tenant_users (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  email text not null,
  role text default 'owner', -- owner | staff | admin
  created_at timestamptz default now()
);

-- 3) Solicitudes de demo desde /demo
create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  company text,
  industry text,
  website text,
  notes text,
  source text default 'website',
  created_at timestamptz default now()
);

-- 4) Planes de precios
create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,  -- starter | pro | enterprise
  name text not null,
  price_usd numeric(10,2) not null,
  currency text default 'USD',
  features text[],
  created_at timestamptz default now()
);

-- 5) Suscripciones de tenants a planes
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  plan_id uuid references public.plans(id),
  status text default 'trialing', -- trialing | active | past_due | cancelled
  started_at timestamptz default now(),
  cancelled_at timestamptz,
  next_renewal_at timestamptz
);

-- 6) Eventos de llamadas (webhook Bland / Twilio)
create table if not exists public.call_events (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade,
  direction text,              -- inbound | outbound
  status text,                 -- completed | missed | failed
  from_number text,
  to_number text,
  duration_seconds int,
  recording_url text,
  lead_name text,
  lead_phone text,
  tags text[],
  created_at timestamptz default now()
);

-- ============================
-- SEED: PLANES REALES FRONTDESK
-- ============================

insert into public.plans (code, name, price_usd, features)
values 
  (
    'starter',
    'Starter',
    399,
    array[
      '1 AI receptionist',
      '1 inbox / número',
      '24/7 llamadas + SMS',
      '1 idioma',
      'Logging y grabaciones básicas'
    ]
  ),
  (
    'pro',
    'Professional',
    899,
    array[
      'Hasta 3 agentes AI',
      'Multilingüe + WhatsApp',
      'Routing avanzado de llamadas',
      'Integración CRM (ej. HubSpot)',
      'Reporting ampliado y dashboards'
    ]
  ),
  (
    'enterprise',
    'Enterprise',
    1799,
    array[
      'Agentes + inboxes ilimitados',
      'Soporte SLA + CSM dedicado',
      'SSO / seguridad enterprise',
      'Workflows personalizados',
      'Integraciones avanzadas y prioridad'
    ]
  )
on conflict (code) do update
set name = excluded.name,
    price_usd = excluded.price_usd,
    features = excluded.features;

-- ============================
-- VIEWS PARA DASHBOARDS
-- ============================

-- Vista agregada por tenant para el Owner Console
create or replace view public.tenant_mrr_summary as
select
  t.id as tenant_id,
  t.name,
  t.industry,
  t.status,
  coalesce(t.mrr_usd, 0) as mrr_usd,
  count(c.*) filter (where c.created_at >= now() - interval '1 day') as calls_24h,
  count(c.*) filter (where c.status = 'missed' and c.created_at >= now() - interval '1 day') as missed_24h
from public.tenants t
left join public.call_events c on c.tenant_id = t.id
group by t.id;

-- Vista de métricas de llamadas para /dashboard
create or replace view public.call_metrics_last_30d as
select
  tenant_id,
  count(*) as total_calls,
  count(*) filter (where status = 'completed') as completed_calls,
  count(*) filter (where status = 'missed') as missed_calls,
  avg(duration_seconds) as avg_duration_sec,
  min(created_at) as first_call_at,
  max(created_at) as last_call_at
from public.call_events
where created_at >= now() - interval '30 days'
group by tenant_id;

-- ============================
-- RLS (Row Level Security)
-- Estrategia: 
--  - RLS activado
--  - Política que permite TODO al service_role
--  - El frontend leerá datos vía API routes usando service_role,
--    no directamente desde el browser.
-- ============================

alter table public.tenants       enable row level security;
alter table public.tenant_users  enable row level security;
alter table public.demo_requests enable row level security;
alter table public.plans         enable row level security;
alter table public.subscriptions enable row level security;
alter table public.call_events   enable row level security;

-- Helper: policy genérica para service_role
create policy "service_role_full_access_tenants"
  on public.tenants
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "service_role_full_access_tenant_users"
  on public.tenant_users
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "service_role_full_access_demo_requests"
  on public.demo_requests
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "service_role_full_access_plans"
  on public.plans
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "service_role_full_access_subscriptions"
  on public.subscriptions
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "service_role_full_access_call_events"
  on public.call_events
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
