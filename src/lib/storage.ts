import { supabase } from './supabase'

export const STORAGE_BUCKETS = {
  COURSE_MATERIALS: 'course-materials',
  COURSE_THUMBNAILS: 'course-thumbnails',
  AVATARS: 'avatars'
} as const

export type StorageBucket = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS]

/**
 * Get a public URL for a file in Supabase storage
 * @param bucket The storage bucket name
 * @param path The file path within the bucket
 * @returns The public URL of the file
 */
export const getPublicUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Upload a file to Supabase storage
 * @param bucket The storage bucket name
 * @param path The file path within the bucket
 * @param file The file to upload
 * @returns The public URL of the uploaded file
 */
export const uploadFile = async (bucket: string, path: string, file: File) => {
  try {
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file)

    if (uploadError) {
      throw uploadError
    }

    return getPublicUrl(bucket, path)
  } catch (error) {
    console.error('Error uploading file:', error)
    throw error
  }
}

/**
 * Delete a file from Supabase storage
 * @param bucket The storage bucket name
 * @param path The file path within the bucket
 */
export const deleteFile = async (bucket: string, path: string) => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      throw error
    }
  } catch (error) {
    console.error('Error deleting file:', error)
    throw error
  }
}

/**
 * Check if a file exists in Supabase storage
 * @param bucket The storage bucket name
 * @param path The file path within the bucket
 * @returns True if the file exists, false otherwise
 */
export const fileExists = async (bucket: string, path: string) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path.split('/').slice(0, -1).join('/'), {
        limit: 1,
        search: path.split('/').pop(),
      })

    if (error) {
      throw error
    }

    return data.length > 0
  } catch (error) {
    console.error('Error checking file existence:', error)
    return false
  }
}

export async function listFiles(
  bucket: StorageBucket,
  path?: string
) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path || '')

    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error listing files:', error)
    return { data: null, error }
  }
} 