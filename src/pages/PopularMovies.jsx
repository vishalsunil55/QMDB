import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

export default function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const searchTerm = "Avengers";

  useEffect(() => {
    if (!apiKey) {
      setError("OMDb API key missing (VITE_OMDB_API_KEY).");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetchMovies = async () => {
      try {
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
          searchTerm
        )}&type=movie&page=${page}`;
        const res = await axios.get(url);
        if (cancelled) return;

        if (res.data && res.data.Response === "True") {
          setMovies(res.data.Search || []);
        } else {
          setMovies([]);
          setError(res.data?.Error || "No results found.");
        }
      } catch {
        if (cancelled) return;
        setMovies([]);
        setError("Failed to fetch. Check your network or API key.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMovies();
    return () => { cancelled = true; };
  }, [page, apiKey]);

  return (
    <section className="bg-black text-gray-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-yellow-400 text-2xl font-bold">Popular Movies</h2>
            <p className="text-sm text-gray-400">Curated results from OMDb (sample search)</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50"
              aria-label="Previous page"
            >
              Prev
            </button>
            <div className="text-sm font-semibold text-yellow-400">Page {page}</div>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={loading}
              className="px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50"
              aria-label="Next page"
            >
              Next
            </button>
          </div>
        </header>

        {loading && <div className="text-center py-12 text-gray-400">Loading popular movies…</div>}

        {error && !loading && (
          <div className="bg-zinc-900 border border-zinc-800 text-red-300 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="text-center text-gray-400 py-8">No movies found.</div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((m) => (
              <MovieCard key={m.imdbID ?? m.Title} movie={m} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
