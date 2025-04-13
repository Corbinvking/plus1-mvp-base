# Course Content Strategy

## Content Types & Storage Strategy

### Video Content Strategy

#### Option 1: YouTube Integration (Recommended for MVP)
**Pros:**
- No storage costs
- Built-in CDN
- Automatic transcoding for different qualities
- Built-in analytics
- Familiar player interface
- Closed captions support
- No bandwidth costs

**Implementation:**
```sql
-- Add to courses table
alter table public.courses add column video_type text check (video_type in ('youtube', 'vimeo', 'hosted'));
alter table public.courses add column video_id text;

-- For course sections/lessons
create table public.course_lessons (
  id uuid default gen_random_uuid(),
  course_id uuid references public.courses(id),
  title text not null,
  description text,
  video_type text check (video_type in ('youtube', 'vimeo', 'hosted')),
  video_id text,
  order_index integer not null,
  duration text,
  is_preview boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- RLS Policy
alter table public.course_lessons enable row level security;
create policy "Course lessons are viewable by enrolled users"
  on public.course_lessons 
  for select 
  using (
    is_preview = true OR 
    exists (
      select 1 from public.user_course_progress 
      where course_id = course_lessons.course_id 
      and user_id = auth.uid()
    )
  );
```

**UI Component:**
```tsx
// src/components/course/VideoPlayer.tsx
interface VideoPlayerProps {
  videoType: 'youtube' | 'vimeo' | 'hosted';
  videoId: string;
  title: string;
  onProgress?: (progress: number) => void;
}

// Using react-youtube for YouTube embedding
```

#### Option 2: Future Self-Hosted Solution
- Use Mux.com or similar service for video hosting
- Implement HLS streaming
- Consider costs vs. control tradeoffs

### PDF Content Strategy

#### Option 1: Supabase Storage (Recommended for MVP)
**Pros:**
- Integrated with our existing backend
- Simple implementation
- Good for smaller files
- Built-in security policies

**Implementation:**
```sql
-- Add to course_lessons table
alter table public.course_lessons add column has_pdf boolean default false;
alter table public.course_lessons add column pdf_url text;

-- Storage bucket policy
create policy "Authenticated users can read course materials"
  on storage.objects for select
  using (auth.role() = 'authenticated' and bucket_id = 'course-materials');
```

**Upload Flow:**
```typescript
// src/lib/storage.ts
export async function uploadCourseMaterial(
  courseId: string,
  lessonId: string,
  file: File
) {
  const path = `${courseId}/${lessonId}/${file.name}`;
  const result = await supabase.storage
    .from('course-materials')
    .upload(path, file);
  return result;
}
```

#### Option 2: CDN Integration (Future Scale)
- Use Cloudflare R2 or similar for larger scale
- Implement caching strategy
- Consider geographic distribution

## Database Schema Updates

```sql
-- Course Content Table
create table public.course_content (
  id uuid default gen_random_uuid(),
  lesson_id uuid references public.course_lessons(id),
  content_type text check (content_type in ('video', 'pdf', 'text')),
  title text not null,
  description text,
  content_url text,
  metadata jsonb default '{}'::jsonb,
  order_index integer not null,
  is_downloadable boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- Content Progress Tracking
create table public.content_progress (
  id uuid default gen_random_uuid(),
  user_id uuid references public.profiles(id),
  content_id uuid references public.course_content(id),
  progress integer default 0,
  completed boolean default false,
  last_position integer default 0, -- For video progress
  notes text,
  last_accessed timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id),
  unique(user_id, content_id)
);
```

## Implementation Phases

### Phase 1: MVP Launch
1. **Video Content:**
   - Implement YouTube embedding
   - Track video progress using YouTube API
   - Support course preview videos

2. **PDF Content:**
   - Use Supabase Storage for PDFs
   - Basic PDF viewer integration
   - Download protection

### Phase 2: Enhanced Features
1. **Video Enhancements:**
   - Custom video player UI
   - Interactive timestamps
   - Notes system tied to video timestamps
   - Playback speed controls

2. **PDF Enhancements:**
   - PDF annotation system
   - Progress tracking by page
   - Search within PDFs
   - Mobile-optimized viewing

### Phase 3: Scale Considerations
1. **Content Delivery:**
   - CDN integration
   - Geographic optimization
   - Bandwidth monitoring
   - Cache strategy

2. **Analytics:**
   - Viewing patterns
   - Engagement metrics
   - Progress tracking
   - Completion rates

## UI Components Needed

1. **Video Player Component:**
```tsx
// src/components/course/VideoPlayer.tsx
export interface VideoPlayerProps {
  videoId: string;
  videoType: 'youtube' | 'vimeo' | 'hosted';
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
  startTime?: number;
}
```

2. **PDF Viewer Component:**
```tsx
// src/components/course/PDFViewer.tsx
export interface PDFViewerProps {
  url: string;
  onPageChange?: (page: number) => void;
  onComplete?: () => void;
  initialPage?: number;
}
```

3. **Progress Tracking:**
```tsx
// src/components/course/ProgressTracker.tsx
export interface ProgressTrackerProps {
  courseId: string;
  userId: string;
  onProgressUpdate: (progress: number) => void;
}
```

## Security Considerations

1. **Content Protection:**
   - Signed URLs for PDFs
   - Video access tokens
   - Rate limiting
   - Download restrictions

2. **User Access:**
   - Course enrollment verification
   - Progress validation
   - Anti-sharing measures

## Cost Analysis

### MVP Phase (0-1000 users)
1. **Video (YouTube):**
   - Cost: Free
   - Bandwidth: Handled by YouTube
   - Storage: Handled by YouTube

2. **PDF (Supabase Storage):**
   - Storage: ~$0.021/GB
   - Bandwidth: Included in Supabase plan
   - Estimated monthly cost: $5-20

### Scale Phase (1000+ users)
1. **Video Options:**
   - Mux.com: ~$0.02/minute streamed
   - Self-hosted: Variable based on volume

2. **PDF Delivery:**
   - CDN costs: ~$0.08/GB transferred
   - Storage: ~$0.021/GB
   - Estimated monthly cost: $50-200

## Next Steps

1. [ ] Set up YouTube API integration
2. [ ] Create Supabase storage buckets
3. [ ] Implement basic video player component
4. [ ] Create PDF viewer component
5. [ ] Set up progress tracking
6. [ ] Implement content protection
7. [ ] Test with sample content

## Resources

- [YouTube Player API](https://developers.google.com/youtube/iframe_api_reference)
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [React PDF Viewer](https://react-pdf-viewer.dev/)
- [Mux Documentation](https://docs.mux.com) 