
type SearchBarProps = {
    entryFilter: string,
    setEntryFilter(e: React.ChangeEvent<HTMLInputElement>) : void
}

export default function SearchBar({entryFilter, setEntryFilter}: SearchBarProps) {
    
    return (
        <div className="flex items-center justify-center mb-12">
            <input placeholder={"Sök efter entries..."} type="text" value={entryFilter} onChange={setEntryFilter} className="border bg-white" />
        </div>
    )
}