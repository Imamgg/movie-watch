"use client";

import { useState } from "react";
import { X, Film, Plus, Check } from "lucide-react";
import { addMovie } from "@/app/actions";
import { GENRE_OPTIONS } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

export function AddMovieModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

    function toggleGenre(genre: string) {
        setSelectedGenres((prev) =>
            prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
        );
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        // Override genre with comma-separated selected genres
        formData.set("genre", selectedGenres.join(", "));
        const result = await addMovie(formData);
        setLoading(false);
        if (result.error) {
            alert("Error adding movie: " + result.error);
        } else {
            setSelectedGenres([]);
            setIsOpen(false);
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="glass-button fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 p-3.5 sm:p-4 rounded-full shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40"
            >
                <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 100 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="glass-card relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5 sm:p-8 z-10 max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-foreground/50 hover:text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="mb-5 sm:mb-6 flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg shadow-purple-500/30">
                                    <Film className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Log a Movie</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Title</label>
                                    <input required name="title" type="text" className="w-full glass-input rounded-xl px-4 py-2.5 sm:py-3 placeholder:text-foreground/30 font-medium text-sm sm:text-base" placeholder="E.g. Interstellar" />
                                </div>

                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Rating</label>
                                        <input required name="rating" type="number" min="0" max="10" step="0.1" className="w-full glass-input rounded-xl px-4 py-2.5 sm:py-3 placeholder:text-foreground/30 text-center text-lg sm:text-xl font-bold" defaultValue="8.0" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Date</label>
                                        <input required name="watched_at" type="date" className="w-full glass-input rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-foreground/90 font-medium text-sm" defaultValue={new Date().toISOString().split("T")[0]} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Genre</label>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {GENRE_OPTIONS.map((g) => (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => toggleGenre(g)}
                                                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wide transition-all border ${selectedGenres.includes(g)
                                                    ? "bg-purple-500/20 dark:bg-purple-400/20 border-purple-500/50 text-purple-600 dark:text-purple-300"
                                                    : "glass border-black/10 dark:border-white/10 text-foreground/60 hover:border-purple-500/30 hover:text-foreground/80"
                                                    }`}
                                            >
                                                {selectedGenres.includes(g) && <Check className="w-3 h-3 inline mr-1 -mt-0.5" />}
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                    <input type="hidden" name="genre" value={selectedGenres.join(", ")} />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Poster URL (Optional)</label>
                                    <input name="poster_url" type="url" className="w-full glass-input rounded-xl px-4 py-2.5 sm:py-3 placeholder:text-foreground/30 text-sm" placeholder="https://..." />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Review (Optional)</label>
                                    <textarea name="review" rows={2} className="w-full glass-input rounded-xl px-4 py-2.5 sm:py-3 placeholder:text-foreground/30 resize-none text-sm leading-relaxed" placeholder="What did you think of it?"></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-1 sm:mt-2 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl px-4 py-3 sm:py-3.5 shadow-lg shadow-purple-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 tracking-wide text-sm sm:text-base"
                                >
                                    {loading ? "Saving..." : "Save to Vault"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
