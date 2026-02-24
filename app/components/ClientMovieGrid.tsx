"use client";

import { useState } from "react";
import { MovieCard } from "./MovieCard";
import { EditMovieModal } from "./EditMovieModal";
import type { Movie } from "@/app/actions";
import { deleteMovie } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";

export function ClientMovieGrid({ initialMovies }: { initialMovies: Movie[] }) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

    async function handleDelete(id: string) {
        setDeletingId(id);
        await deleteMovie(id);
        setDeletingId(null);
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                    {initialMovies.map((movie) => (
                        <motion.div
                            key={movie.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <MovieCard
                                movie={movie}
                                onEdit={setEditingMovie}
                                onDelete={handleDelete}
                                isDeleting={deletingId === movie.id}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <EditMovieModal
                isOpen={!!editingMovie}
                onClose={() => setEditingMovie(null)}
                movie={editingMovie}
            />
        </>
    );
}
