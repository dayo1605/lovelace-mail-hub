
-- profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles: select own" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "Profiles: insert own" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "Profiles: update own" on public.profiles
  for update to authenticated using (auth.uid() = id);

-- trigger to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, company_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'company_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- hostings table
create table public.hostings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null,
  domain text not null,
  mailbox_count int not null default 1,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table public.hostings enable row level security;

create policy "Hostings: select own" on public.hostings
  for select to authenticated using (auth.uid() = user_id);
create policy "Hostings: insert own" on public.hostings
  for insert to authenticated with check (auth.uid() = user_id);
create policy "Hostings: update own" on public.hostings
  for update to authenticated using (auth.uid() = user_id);
create policy "Hostings: delete own" on public.hostings
  for delete to authenticated using (auth.uid() = user_id);
