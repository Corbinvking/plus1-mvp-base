# Supabase Integration Plan

## Existing Structure Analysis

### Current Components
1. **Authentication**
   - `src/app/login/page.tsx`: Existing login page with styled form
   - Already has email/password fields
   - Uses Framer Motion for animations
   - Has routing to dashboard

2. **Dashboard**
   - `src/app/dashboard/`
   - Existing routes:
     - `/courses`
     - `/profile`
     - `/settings`
     - `/learning`

## Phase 1: Authentication Integration (Week 1)

### 1.1 Supabase Setup
- [ ] Create Supabase project
- [ ] Install dependencies:
  ```bash
  npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
  ```
- [ ] Add environment variables to `.env.local`:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your-project-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
  ```

### 1.2 Auth Integration (Preserving Existing UI)
- [ ] Create `src/lib/supabase.ts`:
  ```typescript
  import { createClient } from '@supabase/supabase-js'

  export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  ```

- [ ] Update existing login page (`src/app/login/page.tsx`):
  ```typescript
  // Keep existing UI but update handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      // Use existing styling for error message
    } else {
      router.push("/dashboard")
    }
  }
  ```

- [ ] Add auth middleware (`src/middleware.ts`)
- [ ] Create auth hooks (`src/hooks/useAuth.ts`)

### 1.3 Database Schema Implementation
```sql
-- Extending existing structure with Supabase tables
create table public.profiles (
  id uuid references auth.users on delete cascade,
  username text unique,
  avatar_url text,
  -- Keep existing profile fields from our UI
  primary key (id)
);

-- Match existing course structure
create table public.courses (
  id uuid default gen_random_uuid(),
  title text not null,
  description text,
  thumbnail_url text,
  duration text,
  level text,
  category text,
  primary key (id)
);
```

## Phase 2: Course Integration (Week 2)

### 2.1 Update Existing Course Components
- [ ] Modify `src/app/dashboard/courses/page.tsx`:
  - Keep existing UI structure
  - Replace static data with Supabase queries
  - Add loading states matching our design

### 2.2 Content Infrastructure
- [ ] Add YouTube integration to existing course viewer
- [ ] Set up Supabase storage for PDFs
- [ ] Integrate with existing course layout

## Phase 3: Profile & Settings Integration (Week 3)

### 3.1 Profile Management
- [ ] Update existing profile page with Supabase data
- [ ] Keep current UI/UX
- [ ] Add avatar upload to Supabase storage

### 3.2 Settings Integration
- [ ] Integrate existing settings page with Supabase
- [ ] Maintain current theme system
- [ ] Add new auth-specific settings

## Phase 4: Learning Experience (Week 4)

### 4.1 Course Progress
- [ ] Add progress tracking to existing course viewer
- [ ] Integrate with current UI components
- [ ] Implement resume functionality

### 4.2 Dashboard Enhancements
- [ ] Update existing dashboard stats with real data
- [ ] Keep current card layouts and animations
- [ ] Add progress indicators

## Phase 5: Testing & Security (Week 5)

### 5.1 Testing
- [ ] Test auth flow with existing UI
- [ ] Verify course access controls
- [ ] Test file security
- [ ] Ensure mobile responsiveness maintained

### 5.2 Security
- [ ] Implement RLS policies
- [ ] Secure existing routes
- [ ] Add API protection

## Phase 6: Launch Preparation (Week 6)

### 6.1 Final Integration
- [ ] Verify all existing UI components work with Supabase
- [ ] Test complete user flows
- [ ] Add analytics

### 6.2 Deployment
- [ ] Set up Digital Ocean
- [ ] Configure domains
- [ ] Set up monitoring

## UI Components to Preserve

1. **Existing Animations**
   ```typescript
   // Keep all Framer Motion animations
   <motion.div
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
   >
   ```

2. **Current Styling**
   ```typescript
   // Preserve Tailwind classes
   className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10"
   ```

3. **Layout Structure**
   - Keep existing grid systems
   - Maintain responsive design
   - Preserve component hierarchy

## File Structure Updates

```
src/
├── app/                  # Existing Next.js app structure
│   ├── login/           # Current login page
│   └── dashboard/       # Current dashboard
├── components/          # Existing components
├── lib/
│   ├── supabase.ts     # New Supabase client
│   └── auth.ts         # New auth helpers
└── hooks/
    └── useAuth.ts      # New auth hooks
```

## Integration Guidelines

1. **Preserve UI/UX**
   - Keep all existing animations
   - Maintain current color scheme
   - Preserve component layouts

2. **Add Functionality**
   - Integrate Supabase auth
   - Add real data fetching
   - Implement storage

3. **Enhance Security**
   - Add auth protection
   - Implement RLS
   - Secure file access

## Testing Focus

1. **UI Consistency**
   - Verify animations work
   - Check responsive design
   - Test theme switching

2. **New Features**
   - Test auth flow
   - Verify data persistence
   - Check file uploads

3. **Performance**
   - Measure load times
   - Check animation smoothness
   - Monitor API response times 