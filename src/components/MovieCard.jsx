import React from "react";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  // Normalize movie fields (works for OMDb + custom)
  const id =
    movie.imdbID ||
    movie.id ||
    movie.imdbId ||
    movie.ID ||
    null;

  const title = movie.Title || movie.title;
  const year = movie.Year || movie.year;

  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : movie.poster
      ? movie.poster
      : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <Link
      to={`/movie/${id}`}
      aria-label={title}
      className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:scale-105 transition-transform shadow-md flex flex-col"
    >
      {/* Poster */}
      <img
        src={poster}
        alt={title}
        className="w-full h-72 object-cover"
      />

      {/* Details */}
      <div className="p-3">
        <h3 className="text-yellow-400 font-semibold text-lg leading-snug">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          {year || "Unknown Year"}
        </p>
      </div>
    </Link>
  );
}
