import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    if (!id) return;

    if (!apiKey) {
      setError("OMDb API key missing (VITE_OMDB_API_KEY).");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const source = axios.CancelToken.source();

    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`,
          { cancelToken: source.token }
        );

        if (res.data && res.data.Response === "True") {
          setMovie(res.data);
        } else {
          setMovie(null);
          setError(res.data?.Error || "Movie not found.");
        }
      } catch (err) {
        if (axios.isCancel(err)) return;
        setMovie(null);
        setError("Failed to fetch movie details. Check your network or API key.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();

    return () => {
      source.cancel("Component unmounted - cancel movie fetch");
    };
  }, [id, apiKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="text-gray-400">Loading movie details…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-zinc-900 border border-zinc-800 text-red-300 px-4 py-4 rounded-md">
          {error}
        </div>
        <div className="mt-4">
          <Link to="/popular" className="text-yellow-400 hover:underline">
            ← Back to Popular
          </Link>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center text-gray-400">
        No movie data available.
      </div>
    );
  }

  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <section className="bg-black text-gray-200 py-8 px-4">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {/* Poster */}
        <div className="md:col-span-1 flex justify-center">
          <img
            src={poster}
            alt={movie.Title}
            className="w-64 md:w-72 rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-yellow-400">
            {movie.Title}{" "}
            <span className="text-sm text-gray-400 font-medium">({movie.Year})</span>
          </h1>

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-300">
            <span className="px-3 py-1 bg-zinc-900 rounded-md border border-zinc-800">
              <strong className="text-gray-200">Genre:</strong> {movie.Genre}
            </span>
            <span className="px-3 py-1 bg-zinc-900 rounded-md border border-zinc-800">
              <strong className="text-gray-200">Director:</strong> {movie.Director}
            </span>
            <span className="px-3 py-1 bg-zinc-900 rounded-md border border-zinc-800">
              <strong className="text-gray-200">Actors:</strong> {movie.Actors}
            </span>
            <span className="px-3 py-1 bg-zinc-900 rounded-md border border-zinc-800">
              <strong className="text-gray-200">IMDb Rating:</strong> {movie.imdbRating}
            </span>
          </div>

          <div className="mt-6">
            <h2 className="text-yellow-400 text-xl font-semibold mb-2">Plot</h2>
            <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            {movie.Website && movie.Website !== "N/A" && (
              <a
                href={movie.Website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm bg-yellow-400 text-black px-4 py-2 rounded-md font-medium hover:opacity-90"
              >
                Official Site
              </a>
            )}

            <Link to="/popular" className="text-yellow-400 hover:underline">
              ← Back to Popular
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
