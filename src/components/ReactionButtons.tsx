import { useState } from "react";
import { updateEntryReaction } from "@/lib/supabase/queries";
import { Entry } from "@/types/database.types";
import { emoji } from "zod";

type Reactionprops = { 
  entry: Entry;
};

export default function ReactionButtons({entry}: Reactionprops) {
const [current, setCurrent] = useState<Entry['reaction']>(entry.reaction);

const REACTIONS = [
  {type: 'like', emoji: '👍'},
  {type:'love', emoji: '❤️'},
  {type: 'happy', emoji: '😊'},  
  {type: 'sad', emoji: '😢'}, 
  {type: 'angry', emoji: '😠'},
] as const  

  async function handleClick(type: Entry['reaction']) {
    const newReaction = current === type ? null : type;

    setCurrent(newReaction);
    await updateEntryReaction(entry.id, newReaction ?? null );
  }

  return (
    <div className="flex gap-3 mt-2">
      {REACTIONS.map((r) => (
        <button
          key={r.type}
          onClick={() => handleClick(r.type)}
          className={`text-xl transition ${
            current === r.type ? 'scale-125' : 'opacity-70 hover:opacity-100'
          }`}
        >
          {r.emoji}
        </button>
      ))}
    </div>
  );
}
