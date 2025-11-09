
import React from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MovieList = () => {
    const movies = [
        {
            id: 1,
            title: "Kantara A Legend: Chapter 1",
            rating: 8.5,
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyNtQ_bFXIC83-dgByWXV5yZVJVDKgNXM8M1FF7FeVUF5sgdX3xv1zieGHKdPiGplSIhaazw&s=10",
            trailer: "https://youtu.be/Ze7i3vx7prI",
        },
        {
            id: 2,
            title: "Lokah Chapter One: Chandra",
            rating: 7.9,
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTovxvZdiqAQ0s_SdBVneMbP_wtMGLAegqY8aT8SSYwzcCYx97q169M33Xc_78eOMfYnseo&s=10",
            trailer: "https://youtu.be/64XHtNWTB5o",
        },
        {
            id: 3,
            title: "Diés Iraé",
            rating: 9.4,
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRMZ5u3JolFe3d4hF4fammJe6S311XToFDZ56by8pt4C0UlyFUAY5Ywj-NH-m4_m7nw_3fFzSS3fkv5ICR9HOc2QZcA5zzv1Q4FNq_qA&s=10",
            trailer: "https://youtu.be/S1FGXOamA5I",
        },
        {
            id: 4,
            title: "Dude",
            rating: 8.4,
            image:
                "https://cdn.district.in/movies-assets/images/cinema/gallery%20dude-7773a4e0-2fe1-11f0-b426-a50671acfc24.jpg",
            trailer: "https://youtu.be/4Bsc2uI_LsM",
        },
        {
            id: 5,
            title: "The Pet Detective",
            rating: 8.8,
            image:
                "https://i.ytimg.com/vi/WTQv10OjpBg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB9Mdioj4O4gmVxXhWlc3MOJY6VMw",
            trailer: "https://youtu.be/WTQv10OjpBg",
        },
        {
            id: 6,
            title: "BISON",
            rating: 7.6,
            image:
                "https://m.media-amazon.com/images/M/MV5BYjE0YjM2YjItYjFmNS00YzdhLWI3ZjItNjQ5MTc4MjRmM2JhXkEyXkFqcGc@._V1_.jpg",
            trailer: "https://youtu.be/3Lc-96oH__s",
        },
        {
            id: 7,
            title: "Bigg Boss (Malayalam TV series) season 7",
            rating: 8.5,
            image:
                "https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Bigg_Boss_Malayalam_poster_3.jpg/250px-Bigg_Boss_Malayalam_poster_3.jpg",
            trailer: "https://youtu.be/glzLDgTaLyo",
        },
        {
            id: 8,
            title: "Bha. Bha. Ba.",
            rating: 7.9,
            image: "https://upload.wikimedia.org/wikipedia/en/f/fb/Bha_Bha_Ba_poster.jpg",
            trailer: "https://youtu.be/CrJcYnJnsLs",
        },
        {
            id: 9,
            title: "Marimayam",
            rating: 9.4,
            image:
                "https://m.media-amazon.com/images/S/pv-target-images/33b6483fe9b9f76caaa372d2aef5028ad29aa99c9f40dc8285478b517a7d8e20.jpg",
            trailer: "https://youtu.be/0mMnAEUh06k",
        },
        {
            id: 10,
            title: "Kingdom",
            rating: 8.4,
            image:
                "https://upload.wikimedia.org/wikipedia/en/8/80/Kingdom_2025_Film_Poster.jpg",
            trailer: "https://youtu.be/McPGQ-Nb9Uk",
        },
        {
            id: 11,
            title: "C.I.D. Moosa (Re Release)",
            rating: 8.8,
            image:
                "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/C.I.D._Moosa.jpg/250px-C.I.D._Moosa.jpg",
            trailer: "https://youtu.be/r5-aDvQnC48",
        },
        {
            id: 12,
            title: "Twenty:20 (Re Release)",
            rating: 9.2,
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU3v-2Xkly-EFh9c3ps4rTN5Z0l2DF6ovrieCVyUa5awhTBJiTuRMBUEUXjRNA1CkXMKMqjQ&s=10",
            trailer: "https://youtu.be/bj75LMlUubQ",
        },
    ];

    const scrollBy = (distance) => {
        const container = document.getElementById("movieSlider");
        if (!container) return;
        container.scrollBy({ left: distance, behavior: "smooth" });
    };

    return (
        <section className="bg-black text-white py-10 px-6">
            {/* Section header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-yellow-400 text-2xl font-bold">Fan Favorites</h2>
                    <p className="text-gray-400 text-sm">
                        This week's top TV and movies
                    </p>
                </div>

                {/* Arrows */}
                <div className="flex gap-2">
                    <button
                        onClick={() => scrollBy(-420)}
                        aria-label="scroll left"
                        className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={() => scrollBy(420)}
                        aria-label="scroll right"
                        className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            {/* Movie Scroll Section */}
            <div
                id="movieSlider"
                className="flex gap-6 overflow-x-scroll scrollbar-hide scroll-smooth pb-2"
            >
                {movies.map((m) => (
                    <article
                        key={m.id}
                        className="bg-zinc-900 rounded-2xl w-56 flex-shrink-0 overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
                    >
                        <div className="relative group">
                            <img
                                src={m.image}
                                alt={m.title}
                                className="w-full h-80 object-cover"
                            />

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-2 transition-opacity duration-300">
                                <a
                                    href={m.trailer}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-yellow-400 text-black px-3 py-2 rounded-md text-sm hover:bg-yellow-300 font-bold"
                                >
                                    ▶ Trailer
                                </a>

                            </div>
                        </div>

                        <div className="p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <FaStar className="text-yellow-400" />
                                <span className="text-sm">{m.rating}</span>
                            </div>
                            <h3 className="font-semibold text-sm leading-snug">{m.title}</h3>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default MovieList;