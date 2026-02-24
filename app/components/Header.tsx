import { Film } from "lucide-react";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export function Header() {
    return (
        <header className="fixed top-0 w-full z-50 glass shadow-lg px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center backdrop-blur-md">
            <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl shadow-lg shadow-purple-500/30">
                    <Film className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h1 className="text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 dark:from-purple-400 dark:to-pink-300">
                    LK21 Watch
                </h1>
            </div>
            <nav className="flex items-center gap-2 sm:gap-4">
                <ThemeToggle />
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-pink-500/20 border border-black/10 dark:border-white/20">
                    <span className="font-bold text-xs sm:text-sm text-white">ME</span>
                </div>
            </nav>
        </header>
    );
}