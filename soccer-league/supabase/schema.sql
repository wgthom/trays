-- Youth Soccer League Management Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles (Extends Supabase Auth users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  first_name text check (char_length(first_name) >= 2),
  last_name text check (char_length(last_name) >= 2),
  role text check (role in ('admin', 'coach', 'player', 'parent')) default 'parent',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Leagues
create table leagues (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  admin_id uuid references profiles(id) on delete restrict,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Seasons
create table seasons (
  id uuid default uuid_generate_v4() primary key,
  league_id uuid references leagues(id) on delete cascade not null,
  name text not null, -- e.g., "Fall 2026"
  status text check (status in ('upcoming', 'active', 'archived')) default 'upcoming' not null,
  start_date date,
  end_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Divisions 
-- e.g., "U10 Boys", "U8 COED"
create table divisions (
  id uuid default uuid_generate_v4() primary key,
  season_id uuid references seasons(id) on delete cascade not null,
  name text not null,
  age_group text,
  track_standings boolean default true not null, -- User requested: some divisions only have schedules
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Teams
create table teams (
  id uuid default uuid_generate_v4() primary key,
  division_id uuid references divisions(id) on delete cascade not null,
  name text not null,
  coach_id uuid references profiles(id) on delete set null,
  color_primary text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Rosters (Junction between Profiles and Teams)
create table rosters (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references teams(id) on delete cascade not null,
  profile_id uuid references profiles(id) on delete cascade not null,
  jersey_number integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(team_id, profile_id)
);

-- 7. Games / Schedule
create table games (
  id uuid default uuid_generate_v4() primary key,
  division_id uuid references divisions(id) on delete cascade not null,
  home_team_id uuid references teams(id) on delete cascade not null,
  away_team_id uuid references teams(id) on delete cascade not null,
  start_time timestamp with time zone not null,
  location text not null,
  home_score integer,
  away_score integer,
  status text check (status in ('scheduled', 'in_progress', 'completed', 'cancelled')) default 'scheduled',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  check (home_team_id != away_team_id)
);

-- Enable RLS (Row Level Security) - Basic templates
alter table profiles enable row level security;
alter table leagues enable row level security;
alter table seasons enable row level security;
alter table divisions enable row level security;
alter table teams enable row level security;
alter table rosters enable row level security;
alter table games enable row level security;

-- (Policies omitted for brevity in MVP, but would restrict writes to Admins/Coaches and allow reads for authenticated users)
