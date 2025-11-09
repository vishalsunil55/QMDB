import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const LOCAL_API_URL = "http://localhost:5000/movies";

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Search OMDb API
    const searchOMDb = async () => {
      if (!apiKey) {
        // If no API key, search local database only
        searchLocalDatabase();
        return;
      }

      try {
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(
          query
        )}&type=movie`;
        const res = await axios.get(url);

        if (res.data && res.data.Response === "True" && res.data.Search) {
          setMovies(res.data.Search);
          setLoading(false);
        } else {
          // If no results from OMDb, try local database as fallback
          searchLocalDatabase();
        }
      } catch (err) {
        console.error("Error fetching from OMDb:", err);
        // Fallback to local database
        searchLocalDatabase();
      }
    };

    // Search local database (fallback)
    const searchLocalDatabase = async () => {
      try {
        const res = await fetch(LOCAL_API_URL);
        if (res.ok) {
          const data = await res.json();
          const searchTerm = query.toLowerCase().trim();
          const filtered = data.filter((movie) => {
            const titleMatch = movie.title?.toLowerCase().includes(searchTerm);
            const genreMatch = movie.genre?.toLowerCase().includes(searchTerm);
            const reviewMatch = movie.review?.toLowerCase().includes(searchTerm);
            return titleMatch || genreMatch || reviewMatch;
          });
          setMovies(filtered);
        } else {
          setMovies([]);
          if (!apiKey) {
            setError(
              "Failed to fetch movies. Make sure the JSON server is running on port 5000. Run 'npm run server' in a separate terminal."
            );
          }
        }
      } catch (err) {
        console.error("Error fetching from local database:", err);
        setMovies([]);
        if (!apiKey) {
          setError(
            "Failed to fetch movies. Make sure the JSON server is running on port 5000. Run 'npm run server' in a separate terminal."
          );
        } else {
          setError("No movies found. Please try a different search term.");
        }
      } finally {
        setLoading(false);
      }
    };

    searchOMDb();
  }, [query, apiKey]);

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-400 mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-400">
              Found {movies.length} result{movies.length !== 1 ? "s" : ""} for "
              <span className="text-amber-400 font-semibold">{query}</span>"
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12 text-gray-400">
            Searching movies...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* No Query */}
        {!query.trim() && !loading && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-xl mb-2">Please enter a search query</p>
            <p className="text-sm">Search by movie title, genre, or review content</p>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && query.trim() && movies.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-xl mb-2">No movies found</p>
            <p className="text-sm">
              Try a different search term or browse our{" "}
              <Link to="/public" className="text-amber-400 hover:underline">
                movie collection
              </Link>
            </p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && !error && movies.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie, index) => {
              // Check if it's an OMDb movie (has imdbID) or local movie
              const isOMDbMovie = movie.imdbID;
              
              if (isOMDbMovie) {
                // Use MovieCard for OMDb movies
                return <MovieCard key={movie.imdbID || index} movie={movie} />;
              } else {
                // Render local database movies with custom card
                return (
                  <Link
                    key={movie.id || index}
                    to={`/movie/${movie.id}`}
                    className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-105 transition-transform shadow-lg"
                  >
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-80 object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/250x350?text=No+Image";
                      }}
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-amber-400 font-semibold text-lg line-clamp-2">
                          {movie.title}
                        </h3>
                        <span className="bg-zinc-800 px-2 py-1 rounded text-amber-400 text-sm font-bold ml-2 flex-shrink-0">
                          {movie.rating}/10
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{movie.genre}</p>
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {movie.review}
                      </p>
                    </div>
                  </Link>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

