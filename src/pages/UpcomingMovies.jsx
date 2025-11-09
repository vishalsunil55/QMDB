import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const upcomingTitles = [
  "Deadpool 3",
  "Joker: Folie à Deux",
  "Gladiator 2",
  "Moana 2",
  "Wicked",
  "Sonic the Hedgehog 3"
];

export default function UpcomingMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError("OMDb API key missing (VITE_OMDB_API_KEY).");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetchAll = async () => {
      try {
        const requests = upcomingTitles.map((title) =>
          axios
            .get(
              `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(
                title
              )}`
            )
            .then((res) => res.data)
            .catch(() => null)
        );

        const results = await Promise.all(requests);
        if (cancelled) return;

        const valid = results.filter((r) => r && r.Response === "True");

        // Normalize each item to a consistent shape your MovieCard can consume
    const normalized = valid.map((m) => ({
  id: m.imdbID ?? m.Title,
  title: m.Title,
  year: m.Year,
  poster: m.Poster && m.Poster !== "N/A" ? m.Poster : null,
  imdbID: m.imdbID,
  raw: m
}));


        setMovies(normalized);
      } catch (err) {
        if (cancelled) return;
        setError("Failed to fetch upcoming movies. Try again later.");
        setMovies([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, [apiKey]);

  return (
    <section className="bg-black text-gray-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-yellow-400 text-2xl font-bold">Upcoming Movies</h2>
            <p className="text-sm text-gray-400">
              A curated list of upcoming titles (OMDb lookup).
            </p>
          </div>
        </header>

        {loading && (
          <div className="text-center py-12 text-gray-400">Loading upcoming movies…</div>
        )}

        {error && !loading && (
          <div className="bg-zinc-900 border border-zinc-800 text-red-300 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="text-center text-gray-400 py-8">No upcoming movies found.</div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {movies.map((m) => (
              // MovieCard should accept props like: { title, year, poster, id }.
              // We pass `movie` as normalized object; adjust MovieCard if needed.
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
