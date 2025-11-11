import React, { useEffect, useState, useRef } from "react";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [image, setImage] = useState("");
  const [editingMovie, setEditingMovie] = useState(null);

  const formRef = useRef(null); // ✅ Reference for the form
  const API_URL = "http://localhost:5000/movies"; // JSON Server URL

  // Fetch movies
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  // Add new movie
  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!title || !genre || !rating || !review || !image)
      return alert("Please fill all fields");

    const newMovie = { title, genre, rating, review, image };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies([...movies, data]);
        resetForm();
      });
  };

  // Delete movie
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => setMovies(movies.filter((movie) => movie.id !== id)));
    }
  };

  // Edit movie
  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setTitle(movie.title);
    setGenre(movie.genre);
    setRating(movie.rating);
    setReview(movie.review);
    setImage(movie.image);

    //  Scroll smoothly to the form when editing
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Update movie
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!title || !genre || !rating || !review || !image)
      return alert("Please fill all fields");

    const updatedMovie = { ...editingMovie, title, genre, rating, review, image };

    fetch(`${API_URL}/${editingMovie.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(movies.map((m) => (m.id === data.id ? data : m)));
        resetForm();
      });
  };

  const resetForm = () => {
    setTitle("");
    setGenre("");
    setRating("");
    setReview("");
    setImage("");
    setEditingMovie(null);
  };

  return (
    <div className="movies-container">
      <h1 className="title">Movie Review Hub</h1>

      {/*  Added ref here */}
      <form ref={formRef} className="movie-form" onSubmit={editingMovie ? handleUpdate : handleAddMovie}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating (1-10)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL (poster link)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <textarea
          placeholder="Write a short review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>

        <div className="button-group">
          <button type="submit" className="btn-primary">
            {editingMovie ? "Update Movie" : "Add Movie"}
          </button>
          {editingMovie && (
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="movie-grid">
        {movies.length === 0 ? (
          <p className="empty-text">No movies found</p>
        ) : (
          movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img
                src={movie.image}
                alt={movie.title}
                className="poster"
                onError={(e) => (e.target.src = "https://via.placeholder.com/250x350?text=No+Image")}
              />
              <div className="movie-info">
                <div className="movie-header">
                  <h2>{movie.title}</h2>
                  <span className="rating"> {movie.rating}/10</span>
                </div>
                <p className="genre">{movie.genre}</p>
                <p className="review">{movie.review}</p>
                <div className="actions">
                  <button className="edit-btn" onClick={() => handleEdit(movie)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(movie.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Your existing IMDb-style CSS (no change) */}
      <style jsx>{`
        body {
          background-color: #121212;
          font-family: "Poppins", sans-serif;
          color: #fff;
        }

        .movies-container {
          max-width: 1000px;
          margin: 40px auto;
          padding: 20px;
          background-color: #1a1a1a;
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }

        .title {
          text-align: center;
          color: #f5c518;
          font-size: 2rem;
          margin-bottom: 25px;
        }

        .movie-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #222;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 30px;
        }

        input,
        textarea {
          padding: 10px;
          background-color: #333;
          border: 1px solid #444;
          border-radius: 6px;
          color: #fff;
          font-size: 1rem;
        }

        .button-group {
          display: flex;
          gap: 10px;
        }

        .btn-primary {
          background-color: #f5c518;
          color: #000;
          font-weight: bold;
          padding: 10px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .movie-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
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

        .actions {
          display: flex;
          justify-content: space-between;
        }

        .edit-btn {
          background-color: #007bff;
          border: none;
          color: white;
          padding: 6px 12px;
          border-radius: 5px;
          cursor: pointer;
        }

        .delete-btn {
          background-color: #dc3545;
          border: none;
          color: white;
          padding: 6px 12px;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Movies;