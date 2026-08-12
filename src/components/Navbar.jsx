import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniScissors } from "react-icons/hi2";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 bg-white px-6 py-5 text-stone-900 md:px-12">

      {/* Top Navbar */}
      <div className="flex items-center justify-between">

        <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-2 text-xl font-bold tracking-wide sm:text-2xl"
          >
            <HiMiniScissors className="text-2xl " />
            <span>CUTTINGKING</span>
          </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="transition hover:text-yellow-500"
          >
            Home
          </Link>

          <Link
            to="/services"
            className="transition hover:text-yellow-500"
          >
            Services
          </Link>

          <Link
            to="/about"
            className="transition hover:text-yellow-500"
          >
            About
          </Link>
        </div>

        {/* Desktop Book Button */}
        <Link
          to="/book"
          className="hidden rounded-full bg-yellow-500 px-5 py-2 font-semibold text-black transition hover:bg-yellow-400 md:block"
        >
          Book Now
        </Link>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-stone-900 transition hover:bg-stone-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mt-5 rounded-2xl border border-stone-800 bg-stone-900 p-5 shadow-xl md:hidden">
          <div className="flex flex-col gap-5">

            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="text-white transition hover:text-yellow-400"
            >
              Home
            </Link>

            <Link
              to="/services"
              onClick={() => setIsMenuOpen(false)}
              className="text-white transition hover:text-yellow-400"
            >
              Services
            </Link>

            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="text-white transition hover:text-yellow-400"
            >
              About
            </Link>

            <Link
              to="/book"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full bg-yellow-500 px-5 py-3 text-center font-semibold text-black transition hover:bg-yellow-400"
            >
              Book Now
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

