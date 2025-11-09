import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/Navbar";
import ImageCarousel from "./components/ImageCarousel";
import NewsTicker from "./components/NewsTicker";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";

import PopularMovies from "./pages/PopularMovies";
import UpcomingMovies from "./pages/UpcomingMovies";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";

// ✅ Add these imports
import PublicMovies from "./pages/PublicMovies";
import Movies from "./pages/Movies"; // CRUD page
import SearchResults from "./pages/SearchResults";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <NavBar />

        <main className="flex-grow">
          <Routes>

            {/* ✅ Home */}
            <Route
              path="/"
              element={
                <>
                  <ImageCarousel />
                  <NewsTicker />
                  <MovieList />
                  <PopularMovies />
                  <UpcomingMovies />
                </>
              }
            />

            {/* ✅ Other Pages */}
            <Route path="/popular" element={<PopularMovies />} />
            <Route path="/upcoming" element={<UpcomingMovies />} />
            <Route path="/movie/:id" element={<MovieDetail />} />

            {/* ✅ New pages */}
            <Route path="/public" element={<PublicMovies />} />
            <Route path="/crud" element={<Movies />} />
            <Route path="/search" element={<SearchResults />} />

            {/* ✅ 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
