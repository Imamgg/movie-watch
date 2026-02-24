import { Header } from "@/app/components/Header";
import { AddMovieModal } from "@/app/components/AddMovieModal";
import { ClientMovieGrid } from "@/app/components/ClientMovieGrid";
import { Film } from "lucide-react";
import { getMovies } from "./actions";

export default async function Home() {
  const movies = await getMovies();

  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-20 sm:pb-24">

        <div className="mb-6 sm:mb-10 flex flex-col gap-1 sm:gap-2">
          <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">Your Vault</h2>
          <p className="text-foreground/60 text-sm sm:text-lg">A premium collection of {movies.length} movies you've watched.</p>
        </div>

        {movies.length === 0 ? (
          <div className="glass-card rounded-2xl sm:rounded-3xl p-8 sm:p-12 flex flex-col items-center justify-center text-center mt-8 sm:mt-12 border-dashed border-2 border-black/10 dark:border-white/20 bg-white/20 dark:bg-black/20">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-4 sm:mb-6">
              <Film className="w-8 h-8 sm:w-10 sm:h-10 text-foreground/30" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3">Your vault is empty</h3>
            <p className="text-foreground/50 max-w-md text-sm sm:text-base">You haven't logged any movies yet. Click the + button to add your first movie.</p>
          </div>
        ) : (
          <ClientMovieGrid initialMovies={movies} />
        )}
      </main>
      <AddMovieModal />
    </>
  );
}
