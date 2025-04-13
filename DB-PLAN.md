# Database Integration Plan with Supabase

## Overview
Integration of Supabase as our backend infrastructure to handle authentication, user profiles, and course management while maintaining our existing UI structure.

## Authentication Setup

### Auth Provider Integration
- Email/Password authentication
- OAuth Providers:
  - Google (Gmail)
  - GitHub (optional)
  - Discord (optional, relevant for music community)

### Auth UI Components
- Integrate with existing UI:
  ```tsx
  // Location: src/components/auth/AuthForm.tsx
  // Will handle both sign-in and sign-up
  ```
- Protected routes wrapper
- Auth state management with Supabase client

## Database Schema

### Users Table (handled by Supabase Auth)
```sql
-- Extended user profiles
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

-- RLS Policies
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);
create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);
```

### Courses Table
```sql
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

-- RLS Policies
alter table public.courses enable row level security;
create policy "Courses are viewable by everyone"
  on public.courses for select using (true);
create policy "Instructors can update their courses"
  on public.courses for update using (auth.uid() = instructor_id);
```

### User Course Progress
```sql
create table public.user_course_progress (
  id uuid default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  course_id uuid references public.courses(id),
  progress integer default 0,
  completed boolean default false,
  last_accessed timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id),
  unique(user_id, course_id)
);

-- RLS Policies
alter table public.user_course_progress enable row level security;
create policy "Users can view their own progress"
  on public.user_course_progress for select using (auth.uid() = user_id);
create policy "Users can update their own progress"
  on public.user_course_progress for update using (auth.uid() = user_id);
```

## Integration Steps

1. **Initial Setup**
   ```bash
   # Install Supabase client
   npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
   ```

2. **Environment Configuration**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Client Setup**
   - Create `src/lib/supabase.ts` for client configuration
   - Set up middleware for auth session handling

4. **Component Updates**
   - Update `CoursePreview` to fetch from Supabase
   - Add auth-aware navigation
   - Implement profile management
   - Add course progress tracking

## UI Integration Points

### Auth Flow
1. Add sign-in/sign-up buttons to header
2. Create auth modal or dedicated pages
3. Implement auth state in user menu

### Profile Integration
1. Update dashboard to show user's courses
2. Add profile settings page
3. Implement course progress tracking

### Course Management
1. Update course listing to fetch from Supabase
2. Add progress indicators to course cards
3. Implement course enrollment system

## API Routes Needed

1. `/api/auth/*` - Auth helpers
2. `/api/courses` - Course management
3. `/api/profile` - Profile management
4. `/api/progress` - Course progress tracking

## Security Considerations

1. Row Level Security (RLS) policies
2. Protected API routes
3. Secure environment variables
4. CORS configuration

## Testing Plan

1. Auth flow testing
2. Database queries
3. RLS policy verification
4. UI integration tests

## Next Steps

1. [ ] Set up Supabase project
2. [ ] Implement authentication
3. [ ] Create database tables
4. [ ] Update UI components
5. [ ] Test integration points
6. [ ] Deploy with updated environment variables

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [RLS Examples](https://supabase.com/docs/guides/auth/row-level-security) 