
import React from 'react';

export default function NavBar() {
  return (
    <nav className="bg-gray-950 text-amber-500 px-4 py-2 flex items-center justify-between">
 
      <div className="flex items-center">
        <img src="https://cdn.dribbble.com/userupload/18122564/file/still-d551d098304672098335706a82934d3f.png?format=webp&resize=400x300&vertical=center" alt="Logo" className="h-8 w-8 mr-2"/>
        <span className="font-semibold text-xl">QMDB</span>
      </div>

   
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search movies..."
          className="w-full rounded-md px-3 py-1 text-white-950"
        />
      </div>


      <div className="flex items-center space-x-4">
        <a href="/latest" className="hover:text-gray-300">Latest Movies</a>
      
      </div>
    </nav>
  );
}
