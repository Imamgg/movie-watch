import { getMovies } from "@/app/actions";
import { Header } from "@/app/components/Header";
import { AddMovieModal } from "@/app/components/AddMovieModal";
import { ClientMovieGrid } from "@/app/components/ClientMovieGrid";
import { Film } from "lucide-react";

export default async function Home() {
  const movies = await getMovies();

  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-32 pb-24">

        <div className="mb-10 flex flex-col gap-2">
          <h2 className="text-4xl font-black text-foreground tracking-tight">Your Vault</h2>
          <p className="text-foreground/60 text-lg">A premium collection of {movies.length} movies you've watched.</p>
        </div>

        {movies.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 flex flex-col items-center justify-center text-center mt-12 border-dashed border-2 border-black/10 dark:border-white/20 bg-white/20 dark:bg-black/20">
            <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6">
              <Film className="w-10 h-10 text-foreground/30" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">Your vault is empty</h3>
            <p className="text-foreground/50 max-w-md">You haven't logged any movies yet. Click the + button in the bottom right to add your first movie.</p>
          </div>
        ) : (
          <ClientMovieGrid initialMovies={movies} />
        )}
      </main>
      <AddMovieModal />
    </>
  );
}
