"use client";

import { useState } from "react";
import { X, Film, Pencil } from "lucide-react";
import { updateMovie } from "@/app/actions";
import type { Movie } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    movie: Movie | null;
}

export function EditMovieModal({ isOpen, onClose, movie }: Props) {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!movie) return;

        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const result = await updateMovie(movie.id, formData);
        setLoading(false);

        if (result.error) {
            alert("Error updating movie: " + result.error);
        } else {
            onClose();
        }
    }

    if (!movie) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="glass-card relative w-full max-w-md rounded-3xl p-6 sm:p-8 z-10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-foreground/50 hover:text-foreground transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-6 flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg shadow-indigo-500/30">
                                <Pencil className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground tracking-tight">Edit Movie</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Title</label>
                                <input required name="title" type="text" className="w-full glass-input rounded-xl px-4 py-3 placeholder:text-foreground/30 font-medium" defaultValue={movie.title} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Rating</label>
                                    <input required name="rating" type="number" min="1" max="5" className="w-full glass-input rounded-xl px-4 py-3 placeholder:text-foreground/30 text-center text-xl font-bold" defaultValue={movie.rating} />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Date</label>
                                    <input required name="watched_at" type="date" className="w-full glass-input rounded-xl px-4 py-3 text-foreground/90 font-medium" defaultValue={format(new Date(movie.watched_at), "yyyy-MM-dd")} />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Poster URL (Optional)</label>
                                <input name="poster_url" type="url" className="w-full glass-input rounded-xl px-4 py-3 placeholder:text-foreground/30 text-sm" defaultValue={movie.poster_url || ""} />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-1.5 ml-1">Review (Optional)</label>
                                <textarea name="review" rows={3} className="w-full glass-input rounded-xl px-4 py-3 placeholder:text-foreground/30 resize-none text-sm leading-relaxed" defaultValue={movie.review || ""}></textarea>
                            </div>

                            <div className="mt-2 text-center text-xs text-foreground/40 italic mb-2">
                                Powered by your personal Supabase Vault
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl px-4 py-3.5 shadow-lg shadow-indigo-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 tracking-wide"
                            >
                                {loading ? "Updating..." : "Save Changes"}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
