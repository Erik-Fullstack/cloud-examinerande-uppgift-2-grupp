'use client'
import { Entry } from '@/types/database.types'
import UpdateBox from './updateBox'
import { useState } from 'react';
interface EntryCardProps {
  entry: Entry
}

export default function EntryCard({ entry }: EntryCardProps) {

  const [active, setActive] = useState<boolean>(false)
  const formattedDate = new Date(entry.created_at).toLocaleDateString("sv-SE", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});



  return (
    <div className="card" style={{ minWidth: '600px' }}>
      <div className="mb-4">
        <div className="text-xs text-warm-gray mb-2 tracking-wide uppercase">
          {formattedDate}
        </div>
        <h2 className="text-2xl font-serif text-dark-brown mb-3">{entry.title}</h2>
      </div>
      <p className="text-dark-brown/80 leading-relaxed whitespace-pre-wrap" style={{ width: '550px' }}>
        {entry.content}
      </p>
      <button onClick={() => setActive(!active)} className="text-warm-gray hover:text-dark-brown cursor-pointer text-sm mb-4">Change task📝</button>
      {active && <UpdateBox entry={entry} setActive={setActive} ></UpdateBox> }
      
    </div>
  )
}
