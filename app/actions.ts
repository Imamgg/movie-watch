'use server'
import { supabase } from "@/utils/supabase";
import { revalidatePath } from "next/cache";

export type Movie = {
    id: string;
    title: string;
    rating: number;
    genre?: string | null;
    review?: string | null;
    watched_at: string;
    poster_url?: string | null;
};

export async function getMovies(): Promise<Movie[]> {
    const { data, error } = await supabase
        .from("movies")
        .select("*")
        .order("watched_at", { ascending: false });

    if (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
    return data as Movie[];
}

export async function addMovie(formData: FormData) {
    const title = formData.get("title") as string;
    const rating = parseFloat(Number(formData.get("rating")).toFixed(1));
    const genre = formData.get("genre") as string;
    const review = formData.get("review") as string;

    const watchDate = formData.get("watched_at") as string;
    const watched_at = watchDate ? new Date(watchDate).toISOString() : new Date().toISOString();

    const poster_url = formData.get("poster_url") as string;

    const { error } = await supabase
        .from("movies")
        .insert([{
            title,
            rating,
            genre: genre || null,
            review: review || null,
            watched_at,
            poster_url: poster_url || null
        }]);

    if (error) {
        console.error("Error adding movie:", error);
        return { error: error.message };
    }

    revalidatePath("/");
    return { success: true };
}

export async function updateMovie(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const rating = parseFloat(Number(formData.get("rating")).toFixed(1));
    const genre = formData.get("genre") as string;
    const review = formData.get("review") as string;

    const watchDate = formData.get("watched_at") as string;
    const watched_at = watchDate ? new Date(watchDate).toISOString() : new Date().toISOString();

    const poster_url = formData.get("poster_url") as string;

    const { error } = await supabase
        .from("movies")
        .update({
            title,
            rating,
            genre: genre || null,
            review: review || null,
            watched_at,
            poster_url: poster_url || null
        })
        .eq("id", id);

    if (error) {
        console.error("Error updating movie:", error);
        return { error: error.message };
    }

    revalidatePath("/");
    return { success: true };
}

export async function deleteMovie(id: string) {
    const { error } = await supabase
        .from("movies")
        .delete()
        .eq("id", id);
    if (error) {
        console.error("Error deleting movie:", error);
        return { error: error.message };
    }
    revalidatePath("/");
    return { success: true };
}