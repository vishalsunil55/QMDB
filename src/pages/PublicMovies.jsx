import React, { useEffect, useState } from "react";

const PublicMovies = () => {
  const [movies, setMovies] = useState([]);
  const API_URL = "http://localhost:5000/movies"; // JSON Server URL

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div className="public-container">
      <h1 className="title">Explore Movies</h1>

      <div className="movie-grid">
        {movies.length === 0 ? (
          <p className="empty-text">No movies available</p>
        ) : (
          movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={movie.image}
                alt={movie.title}
                className="poster"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/250x350?text=No+Image")
                }
              />
              <div className="movie-info">
                <div className="movie-header">
                  <h2>{movie.title}</h2>
                  <span className="rating"> {movie.rating}/10</span>
                </div>
                <p className="genre">{movie.genre}</p>
                <p className="review">{movie.review}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* IMDb-style CSS */}
      <style>
        {`
          body {
            background-color: #121212;
            font-family: "Poppins", sans-serif;
            color: #fff;
          }

          .public-container {
            max-width: 1500px;
            margin: 40px auto;
            padding: 20px;
            background-color: #1a1717ff;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
          }

          .title {
            text-align: center;
            color: #f5c518;
            font-size: 2rem;
            margin-top: -5px;
          }

      .movie-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* exactly 3 per row */
  gap: 20px;
}

/* Make it responsive for smaller screens */
@media (max-width: 900px) {
  .movie-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 per row on tablets */
  }
}

@media (max-width: 600px) {
  .movie-grid {
    grid-template-columns: 1fr; /* 1 per row on mobile */
  }
}

.movie-card {
  background: #222;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s ease-in-out;
  overflow: hidden;
}

.movie-card:hover {
  transform: translateY(-5px);
}

          .poster {
            width: 100%;
            height: 350px;
            object-fit: cover;
            border-bottom: 3px solid #f5c518;
          }

          .movie-info {
            padding: 15px;
          }

          .movie-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }

          .movie-header h2 {
            font-size: 1.2rem;
            color: #f5c518;
          }

          .rating {
            background: #333;
            padding: 5px 10px;
            border-radius: 6px;
            color: #f5c518;
            font-weight: bold;
          }

          .genre {
            font-size: 0.9rem;
            color: #ccc;
            margin-bottom: 10px;
          }

          .review {
            font-size: 0.95rem;
            color: #eee;
            margin-bottom: 15px;
          }

          .empty-text {
            text-align: center;
            color: #aaa;
            font-size: 1rem;
            margin-top: 20px;
          }

          @media (max-width: 600px) {
            .public-container {
              padding: 15px;
            }
            .poster {
              height: 280px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PublicMovies;