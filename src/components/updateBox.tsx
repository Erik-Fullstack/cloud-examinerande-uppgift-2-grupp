"use client";

import { useState, useEffect, Dispatch } from "react";
import { useRouter } from "next/navigation";
import { updateEntry } from "@/lib/supabase/queries";
import { getCurrentUser } from "@/lib/supabase/auth";
import { Entry } from "@/types/database.types";

interface EntryCardProps {
  entry: Entry
  setActive: Dispatch<boolean>;
}

export default function UpdateBox ({entry, setActive}: EntryCardProps) {
	const router = useRouter();
	const [title, setTitle] = useState(entry.title);
	const [content, setContent] = useState(entry.content);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

    useEffect(() => {
		async function checkAuth() {
			const user = await getCurrentUser();
			if (!user) {
				router.push("/login");
			}
		}

		checkAuth();
	}, [router]);

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setError(null);
    
            if (!title.trim() || !content.trim()) {
                setError("Title and content are required");
                return;
            }
    
            setLoading(true);
    
            try {
                await updateEntry({ title: title, content: content, id: entry.id});
                location.reload()
                setActive(false)
                setLoading(false)
            } catch (err: any) {
                setError(err.message || "Failed to create entry");
                setLoading(false);
            }
        };

    return (
                <div>
                    <main className="max-w-3xl mx-auto px-6 py-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm mb-2 text-dark-brown font-medium"
                                >
                                    Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={title.split('Title är:')[1]}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="input-field text-xl font-serif"
                                    placeholder="Change title..."
                                    required
                                    disabled={loading}
                                />
                            </div>
        
                            <div>
                                <label
                                    htmlFor="content"
                                    className="block text-sm mb-2 text-dark-brown font-medium"
                                >
                                    Content
                                </label>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="input-field min-h-[100px] resize-y leading-relaxed"
                                    placeholder="Change your thoughts..."
                                    required
                                    disabled={loading}
                                />
                            </div>
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-sm text-sm">
                                    {error}
                                </div>
                            )}
                            <div className="flex gap-4">
                                <button type="submit" className="btn-primary" disabled={loading}>
                                    {loading ? "Saving..." : "Save Entry"}
                                </button>
                            </div>
                        </form>
                    </main>
                </div>
    )
}
