import { supabase } from './client'
import { Entry, NewEntry, UpdateEntry } from '@/types/database.types'

/**
 * Fetch all entries for the authenticated user
 */
export async function getEntries(): Promise<Entry[]> {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('entries')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data || []
}

/**
 * Create a new entry for the authenticated user
 */
export async function createEntry(entry: NewEntry): Promise<Entry> {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('User not authenticated')
  }

  const { data, error } = await supabase
    .from('entries')
    .insert([
      {
        user_id: user.id,
        title: `Title är: ${entry.title}`,
        content: entry.content,
        created_at: new Date().toISOString()
      }
    ])
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}

export async function updateEntry(entry: UpdateEntry): Promise<Entry> {
  const {data: { user} } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(`User not Authenticated`)
  }

  const { data, error } = await supabase
    .from('entries')
    .update({title: `Title är: ${entry.title}`, content: entry.content})
    .eq('id', entry.id)
    .select()
    .single();

    if (error) {
      throw error
    }

    return data
}

export async function deleteEntry(id: string) {
  
  const {data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  const { error } = await supabase
  .from('entries')
  .delete()
  .eq('id', id)

  if(error) {
    throw error 
  }

}

export async function updateEntryReaction(entryId: string, reactionType: string | null | undefined): Promise<Entry> {
  
  const { data: { user } } = await supabase.auth.getUser()
   if (!user) {
    throw new Error('User not authenticated')
   }

   const { data, error } = await supabase
    .from('entries')
    .update({reaction: reactionType})
    .eq('id', entryId)
    .eq('user_id', user.id)
    .select()
    .single()

    if (error) {
      throw error
    }

    return data
}