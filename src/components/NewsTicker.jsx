
import React from 'react';
import Marquee from 'react-fast-marquee';

const newsItems = [
  "🏆 Mohanlal honoured with the prestigious Dadasaheb Phalke Award for his outstanding contribution to Indian cinema.",
    "🌟 Rajinikanth announced his next big-budget action film directed by Lokesh Kanagaraj, set for 2026.",
    "🎥 SS Rajamouli confirmed his next project will be a historical epic starring Mahesh Babu.",
    "🎶 AR Rahman unveiled a new music label to promote independent Indian artists across languages.",
    "🎬 Alia Bhatt won the National Film Award for Best Actress for her performance in Gangubai Kathiawadi."
];

export default function NewsTicker() {
  return (
    <div className="bg-gray-950 text-gray-200 py-2">
      <Marquee speed={50} pauseOnHover={true} gradient={false}>
        {newsItems.map((item, idx) => (
          <span key={idx} className="mx-8 whitespace-nowrap">
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
