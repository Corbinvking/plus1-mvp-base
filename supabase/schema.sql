-- Reset public schema
drop schema public cascade;
create schema public;
grant all on schema public to postgres;
grant all on schema public to public;

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- Courses table
create table public.courses (
  id uuid default gen_random_uuid(),
  title text not null,
  description text,
  thumbnail_url text,
  duration text,
  level text check (level in ('beginner', 'intermediate', 'advanced')),
  category text,
  instructor_id uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- Course lessons table
create table public.course_lessons (
  id uuid default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  title text not null,
  description text,
  order_index integer not null,
  duration text,
  video_url text,
  pdf_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id),
  unique(course_id, order_index)
);

-- Course enrollments table
create table public.course_enrollments (
  id uuid default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  course_id uuid references public.courses(id) on delete cascade,
  enrolled_at timestamp with time zone default timezone('utc'::text, now()),
  completed_at timestamp with time zone,
  primary key (id),
  unique(user_id, course_id)
);

-- Lesson progress table
create table public.lesson_progress (
  id uuid default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  lesson_id uuid references public.course_lessons(id) on delete cascade,
  progress integer default 0 check (progress >= 0 and progress <= 100),
  completed boolean default false,
  last_accessed timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id),
  unique(user_id, lesson_id)
);

-- User achievements table
create table public.achievements (
  id uuid default gen_random_uuid(),
  title text not null,
  description text,
  icon_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- User earned achievements table
create table public.user_achievements (
  id uuid default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  achievement_id uuid references public.achievements(id) on delete cascade,
  earned_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id),
  unique(user_id, achievement_id)
);

-- User settings table
create table public.user_settings (
  user_id uuid references public.profiles(id) on delete cascade,
  theme text default 'light' check (theme in ('light', 'dark', 'system')),
  email_notifications boolean default true,
  push_notifications boolean default true,
  marketing_emails boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (user_id)
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.course_lessons enable row level security;
alter table public.course_enrollments enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;
alter table public.user_settings enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Courses policies
create policy "Courses are viewable by everyone"
  on public.courses for select
  using (true);

create policy "Instructors can insert courses"
  on public.courses for insert
  with check (auth.uid() = instructor_id);

create policy "Instructors can update their courses"
  on public.courses for update
  using (auth.uid() = instructor_id);

create policy "Instructors can delete their courses"
  on public.courses for delete
  using (auth.uid() = instructor_id);

-- Course lessons policies
create policy "Course lessons are viewable by everyone"
  on public.course_lessons for select
  using (true);

create policy "Instructors can manage course lessons"
  on public.course_lessons for all
  using (
    auth.uid() in (
      select instructor_id from public.courses
      where id = course_id
    )
  );

-- Course enrollments policies
create policy "Users can view their own enrollments"
  on public.course_enrollments for select
  using (auth.uid() = user_id);

create policy "Users can enroll themselves"
  on public.course_enrollments for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own enrollments"
  on public.course_enrollments for update
  using (auth.uid() = user_id);

-- Lesson progress policies
create policy "Users can view their own progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id);

-- Achievements policies
create policy "Achievements are viewable by everyone"
  on public.achievements for select
  using (true);

-- User achievements policies
create policy "Users can view their own achievements"
  on public.user_achievements for select
  using (auth.uid() = user_id);

create policy "System can insert user achievements"
  on public.user_achievements for insert
  with check (true);  -- This will be controlled through functions/triggers

-- User settings policies
create policy "Users can view their own settings"
  on public.user_settings for select
  using (auth.uid() = user_id);

create policy "Users can insert their own settings"
  on public.user_settings for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own settings"
  on public.user_settings for update
  using (auth.uid() = user_id);

-- Create indexes for better query performance
create index course_lessons_course_id_idx on public.course_lessons(course_id);
create index course_lessons_order_idx on public.course_lessons(course_id, order_index);
create index course_enrollments_user_idx on public.course_enrollments(user_id);
create index course_enrollments_course_idx on public.course_enrollments(course_id);
create index lesson_progress_user_idx on public.lesson_progress(user_id);
create index lesson_progress_lesson_idx on public.lesson_progress(lesson_id);
create index user_achievements_user_idx on public.user_achievements(user_id);

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql security definer;

-- Create triggers for updated_at
create trigger handle_updated_at_profiles
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at_courses
  before update on public.courses
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at_course_lessons
  before update on public.course_lessons
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at_lesson_progress
  before update on public.lesson_progress
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at_user_settings
  before update on public.user_settings
  for each row execute procedure public.handle_updated_at();

-- Create function to automatically create a profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create function to automatically create user settings on profile creation
create or replace function public.handle_new_profile()
returns trigger as $$
begin
  insert into public.user_settings (user_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new profile creation
create trigger on_profile_created
  after insert on public.profiles
  for each row execute procedure public.handle_new_profile(); 