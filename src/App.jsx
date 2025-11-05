import React from 'react';
import NavBar from './components/Navbar';
import ImageCarousel from './components/ImageCarousel';
import NewsTicker from './components/NewsTicker';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <ImageCarousel />
      <NewsTicker />
      <Footer/>
      {/* Below this you can add more sections: e.g., movie list, featured films etc */}
    </div>
  );
}

export default App;

