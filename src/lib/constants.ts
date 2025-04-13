export const STORAGE_BUCKETS = {
  COURSE_CONTENT: 'course-content',
  AVATARS: 'avatars',
} as const

export type StorageBucket = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS] 