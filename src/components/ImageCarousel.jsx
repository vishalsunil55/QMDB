import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const images = [
  'https://lh3.googleusercontent.com/proxy/yHVViHyH2N3Vp0dXuvAidzDQ8ZewJev_3dLtB3VrFTbl5h1heq62AiE3rz4tXs4ctrta7KGS096QS1pxVRRuVsL1PuWp',
  'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1f3c5157-f166-4869-b8f1-2668373c12e7/db57jen-c354ffcb-a423-4628-8618-122ae48c7499.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi8xZjNjNTE1Ny1mMTY2LTQ4NjktYjhmMS0yNjY4MzczYzEyZTcvZGI1N2plbi1jMzU0ZmZjYi1hNDIzLTQ2MjgtODYxOC0xMjJhZTQ4Yzc0OTkuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.MZzDlhPyDMILnO6wESovzjmhKo3GPvyTUGUueN4VKho',
  'https://m.media-amazon.com/images/I/61O8KP0CYVS.jpg',
  'https://mohanlalwood.com/wp-content/uploads/2025/06/wvwwwke7cwwe1.jpeg',
  'https://m.media-amazon.com/images/I/81Calh8XRBL.jpg',
  'https://c4.wallpaperflare.com/wallpaper/852/644/1008/alien-movie-poster-sigourney-weaver-movie-poster-wallpaper-preview.jpg',
  'https://upload.wikimedia.org/wikipedia/en/8/85/Ram_Movie_first_look.jpg',
];

export default function CardCarousel() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      showDots={true}
      containerClass="px-4"
    >
     {images.map((src, idx) => (
  <div key={idx} className="p-2">
    <img
      src={src}
      alt={`card-${idx}`}
      className="w-full h-128 object-cover rounded-lg shadow-lg"
    />
  </div>
))}

    </Carousel>
  );
}
