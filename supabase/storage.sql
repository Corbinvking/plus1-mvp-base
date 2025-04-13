-- Avatars bucket policies
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Users can upload their own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars' AND
    auth.uid() = owner AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can update their own avatar"
  on storage.objects for update
  using (
    bucket_id = 'avatars' AND
    auth.uid() = owner AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can delete their own avatar"
  on storage.objects for delete
  using (
    bucket_id = 'avatars' AND
    auth.uid() = owner AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Course materials bucket policies
create policy "Course materials are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'course-materials' );

create policy "Instructors can upload course materials"
  on storage.objects for insert
  with check (
    bucket_id = 'course-materials' AND
    auth.uid() in (
      select instructor_id from public.courses
      where id = (storage.foldername(name))[1]::uuid
    )
  );

create policy "Instructors can update their course materials"
  on storage.objects for update
  using (
    bucket_id = 'course-materials' AND
    auth.uid() in (
      select instructor_id from public.courses
      where id = (storage.foldername(name))[1]::uuid
    )
  );

create policy "Instructors can delete their course materials"
  on storage.objects for delete
  using (
    bucket_id = 'course-materials' AND
    auth.uid() in (
      select instructor_id from public.courses
      where id = (storage.foldername(name))[1]::uuid
    )
  );

-- Course thumbnails bucket policies
create policy "Course thumbnails are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'course-thumbnails' );

create policy "Instructors can upload course thumbnails"
  on storage.objects for insert
  with check (
    bucket_id = 'course-thumbnails' AND
    auth.uid() in (
      select instructor_id from public.courses
      where id = (storage.foldername(name))[1]::uuid
    )
  );

create policy "Instructors can update course thumbnails"
  on storage.objects for update
  using (
    bucket_id = 'course-thumbnails' AND
    auth.uid() in (
      select instructor_id from public.courses
      where id = (storage.foldername(name))[1]::uuid
    )
  );

create policy "Instructors can delete course thumbnails"
  on storage.objects for delete
  using (
    bucket_id = 'course-thumbnails' AND
    auth.uid() in (
      select instructor_id from public.courses
      where id = (storage.foldername(name))[1]::uuid
    )
  ); 