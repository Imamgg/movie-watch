"use client";

import { useState } from "react";
import { X, Film, Plus } from "lucide-react";
import { addMovie } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";

export function AddMovieModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const result = await addMovie(formData);
        setLoading(false);
        if (result.error) {
            alert("Error adding movie: " + result.error);
        } else {
            setIsOpen(false);
        }
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="glass-button fixed bottom-8 right-8 z-40 p-4 rounded-full shadow-xl shadow-purple-500/20 hover:shadow-purple-500/40"
            >
                <Plus className="w-6 h-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="glass-card relative w-full max-w-md rounded-3xl p-6 sm:p-8 z-10"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-foreground/50 hover:text-foreground transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="mb-6 flex items-center gap-3">
                                <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg shadow-purple-500/30">
                                    <Film className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-foreground tracking-tight">Log a Movie</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Title</label>
                                    <input required name="title" type="text" className="w-full glass-input rounded-xl px-4 py-3 placeholder:text-foreground/30 font-medium" placeholder="E.g. Interstellar" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Rating</label>
                                        <input required name="rating" type="number" min="1" max="5" className="w-full glass-input rounded-xl px-4 py-3 placeholder:text-foreground/30 text-center text-xl font-bold" defaultValue="5" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Date</label>
                                        <input required name="watched_at" type="date" className="w-full glass-input rounded-xl px-4 py-3 text-foreground/90 font-medium" defaultValue={new Date().toISOString().split("T")[0]} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Poster URL (Optional)</label>
                                    <input name="poster_url" type="url" className="w-full glass-input rounded-xl px-4 py-3 placeholder:text-foreground/30 text-sm" placeholder="https://..." />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Review (Optional)</label>
                                    <textarea name="review" rows={3} className="w-full glass-input rounded-xl px-4 py-3 placeholder:text-foreground/30 resize-none text-sm leading-relaxed" placeholder="What did you think of it?"></textarea>
                                </div>

                                <div className="mt-2 text-center text-xs text-foreground/40 italic mb-2">
                                    Powered by your personal Supabase Vault
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl px-4 py-3.5 shadow-lg shadow-purple-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 tracking-wide"
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
