import React from "react";
import { FaTiktok, FaInstagram, FaXTwitter, FaYoutube, FaFacebookF } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-black text-gray-400 text-sm mt-10 border-t border-gray-800">

            <div className="flex flex-col md:flex-row justify-center items-center gap-10 py-6">
                <div className="flex flex-col items-center gap-3">
                    <p className="text-white font-semibold">Follow QMDb on social</p>
                    <div className="flex gap-4 text-lg">
                        <FaTiktok className="hover:text-white cursor-pointer" />
                        <FaInstagram className="hover:text-white cursor-pointer" />
                        <FaXTwitter className="hover:text-white cursor-pointer" />
                        <FaYoutube className="hover:text-white cursor-pointer" />
                        <FaFacebookF className="hover:text-white cursor-pointer" />
                    </div>
                </div>


            </div>


            <div className="flex flex-wrap justify-center gap-6 text-xs py-4 border-t border-gray-800">
                {[
                    "Help",




                    "License Data",
                    "Privacy Policy",

                ].map((link, i) => (
                    <a key={i} href="#" className="hover:text-white">
                        {link}
                    </a>
                ))}
            </div>

        
            <div className="text-center text-gray-500 py-4 border-t border-gray-800 text-xs">
                <p>an <span className="text-white font-semibold">QMDB</span> company</p>
                <p className="mt-1">© 2025 QMDb.com, Inc.</p>
            </div>
        </footer>
    );
}
