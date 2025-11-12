'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import EntryCard from '@/components/EntryCard'
import { getEntries } from '@/lib/supabase/queries'
import { getCurrentUser } from '@/lib/supabase/auth'
import { Entry, EntryInput } from '@/types/database.types'
import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

interface AIresponse {
  summary: string,
  vibe: string,
  advice: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [entryFilter, setEntryFilter] = useState<string>("")
  const [aiEntry, setAiEntry] = useState<AIresponse[]>();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEntryFilter(e.target.value)
  }
  const handleSubmit = async (entries: EntryInput[]) => {
    const summarization: AIresponse[] = await Promise.all(
      entries.map(async e => {
        try {
           const response = await fetch('/api/generate', {
               method: "POST",
               headers: {
                   "Content-type" : "application/json",
               },
               body: JSON.stringify(e.content)
           })
           const {result} = await response.json();
           return await JSON.parse(result);
       } catch (error) {
           console.error('Error:', error)
       }
      })
    )
    setAiEntry(summarization);
  }

  useEffect(() => {
    async function loadData() {
      try {
        const user = await getCurrentUser()

        if (!user) {
          router.push('/login')
          return
        }

        const data = await getEntries()
        setEntries(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load entries')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-warm-gray text-center">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-4xl mx-auto py-12" style={{ paddingLeft: '80px', paddingRight: '80px' }}>
        <SearchBar entryFilter={entryFilter} setEntryFilter={handleOnChange}/>
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-serif text-dark-brown mb-2">Your Entries</h2>
            <p className="text-warm-gray text-sm">
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </p>
          </div>
          <Link href="/new-entry">
            <button className="btn-primary" style={{ minWidth: '160px' }}>
              New Entry
            </button>
          </Link>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-warm-gray mb-6">You haven't written any entries yet.</p>
            <Link href="/new-entry">
              <button className="btn-secondary">Write your first entry</button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {entries.filter(entry => JSON.stringify(entry).toLowerCase().includes(entryFilter.toLowerCase())).map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
        <button onClick={() => handleSubmit(entries) }className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-1 rounded cursor-pointer mr-2 mb-2">
          Generate AI summarization of your posts
        </button>
          </div>
        )}
          {aiEntry && aiEntry.map(e => (
          <div key={aiEntry.indexOf(e)} className="relative card" style={{ minWidth: '600px' }}>
            <h2 className='font-extrabold text-black text-lg'>Vibe: {e.vibe}</h2>
            <p className="text-warm-gray text-sm">{e.summary}</p>
            <br/>
            <h3 className='font-bold text-black text-lg'>Advice</h3>
            <p className="text-warm-gray text-sm">{e.advice}</p>
          </div>
      ))}
      </main>
    </div>
  )
}