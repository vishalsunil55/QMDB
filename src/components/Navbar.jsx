import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const linkClass =
    "text-amber-400/80 hover:text-amber-400 transition font-medium";
  const activeClass =
    "text-amber-400 font-semibold border-b-2 border-amber-400 pb-0.5";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="bg-gray-950 text-amber-400 px-4 py-2 sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center gap-4">
        
        {/* ✅ Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://cdn.dribbble.com/userupload/18122564/file/still-d551d098304672098335706a82934d3f.png?format=webp&resize=400x300&vertical=center"
            alt="QMDB logo"
            className="h-8 w-8 rounded"
          />
          <span className="font-semibold text-xl">QMDB</span>
        </Link>

        {/* ✅ Nav links */}
        <div className="hidden sm:flex items-center gap-5">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
            end
          >
            Home
          </NavLink>

          <NavLink
            to="/popular"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
          >
            Popular
          </NavLink>

          <NavLink
            to="/upcoming"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
          >
            Upcoming
          </NavLink>

          {/* ✅ Public Movies Page */}
          <NavLink
            to="/public"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
          >
            Public
          </NavLink>

          {/* ✅ CRUD Admin Page */}
          <NavLink
            to="/crud"
            className={({ isActive }) => (isActive ? activeClass : linkClass)}
          >
            Manage
          </NavLink>
        </div>

        {/* ✅ Search Bar */}
        <form onSubmit={handleSearch} className="flex-1">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full rounded-md px-3 py-2 bg-gray-900 text-gray-100 placeholder:text-gray-500 border border-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
          />
        </form>

        {/* ✅ Removed Latest Movies completely */}
      </div>
    </nav>
  );
}
