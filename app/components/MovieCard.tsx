import { Star, Trash2, Calendar, Pencil } from "lucide-react";
import { format } from "date-fns";
import type { Movie } from "@/app/actions";
import { cn } from "@/lib/utils";

interface Props {
    movie: Movie;
    onEdit: (movie: Movie) => void;
    onDelete: (id: string) => void;
    isDeleting: boolean;
}

export function MovieCard({ movie, onEdit, onDelete, isDeleting }: Props) {
    return (
        <div className={cn("glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 group relative", isDeleting && "opacity-50 blur-sm pointer-events-none")}>
            <div className="h-48 relative bg-white/40 dark:bg-black/40 overflow-hidden shrink-0 flex items-center justify-center border-b border-black/10 dark:border-white/10">
                {movie.poster_url ? (
                    <img src={movie.poster_url} alt={movie.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="text-black/20 dark:text-white/20 flex flex-col items-center">
                        <span className="text-4xl font-black opacity-10">{movie.title.charAt(0)}</span>
                    </div>
                )}
                <div className="absolute top-3 right-3 glass px-3 py-1 rounded-full flex items-center gap-1 shadow-lg border border-black/10 dark:border-white/20">
                    <Star className="w-4 h-4 text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400" />
                    <span className="font-bold text-sm tracking-wide text-foreground">{movie.rating}</span>
                </div>

                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <button
                        onClick={() => onEdit(movie)}
                        disabled={isDeleting}
                        title="Edit movie"
                        className="p-2 bg-indigo-500/10 hover:bg-indigo-500/30 dark:bg-indigo-500/20 dark:hover:bg-indigo-500/40 backdrop-blur-md rounded-full text-indigo-600 dark:text-indigo-100 opacity-0 group-hover:opacity-100 transition-all border border-indigo-500/20 dark:border-indigo-500/30 font-bold focus:opacity-100 disabled:pointer-events-none shadow-lg"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => onDelete(movie.id)}
                        disabled={isDeleting}
                        title="Remove from vault"
                        className="p-2 bg-red-500/10 hover:bg-red-500/30 dark:bg-red-500/20 dark:hover:bg-red-500/40 backdrop-blur-md rounded-full text-red-600 dark:text-red-100 opacity-0 group-hover:opacity-100 transition-all border border-red-500/20 dark:border-red-500/30 font-bold focus:opacity-100 disabled:pointer-events-none shadow-lg"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">{movie.title}</h3>
                <div className="flex items-center text-foreground/50 text-xs mb-4 gap-1.5 font-medium tracking-wide">
                    <Calendar className="w-3.5 h-3.5 opacity-70" />
                    <span>Watched on {format(new Date(movie.watched_at), "MMM d, yyyy")}</span>
                </div>

                {movie.review ? (
                    <p className="text-foreground/70 text-sm line-clamp-3 text-pretty italic border-l-2 border-purple-500/50 pl-3 leading-relaxed">"{movie.review}"</p>
                ) : (
                    <p className="text-foreground/30 text-sm italic py-2">No review provided.</p>
                )}
            </div>
        </div>
    );
}
