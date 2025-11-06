

export interface Entry {
  id: string
  user_id: string
  title: string
  content: string
  created_at: string
}

export interface NewEntry {
  title: string
  content: string
}

export interface UpdateEntry {
  title: string
  content: string
  id: string
}