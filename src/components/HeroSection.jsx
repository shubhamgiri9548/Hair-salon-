
import { Link } from "react-router-dom";
import barberHero from "../assets/barber-hero.png";

function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[80vh] overflow-hidden bg-stone-950"
    >
      {/* Hero Image */}
      <div className="hero-image absolute inset-y-0 right-0 w-full md:w-[60%]">
        <img
          src={barberHero}
          alt="Professional barber providing grooming service"
          className="h-full w-full object-cover"
        />

        {/* Image Fade */}
        <div className="absolute inset-0 bg-linear-to-r from-stone-950 via-stone-950/65 to-transparent" />

        {/* Bottom Fade */}
        <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-7xl items-center px-6 py-20">
        <div className="max-w-2xl text-left">

          {/* Small Label */}
          <p className="hero-label mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            Premium Hair & Grooming
          </p>

          {/* Heading */}
          <h1 className="hero-heading text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Look Good.
            <br />
            <span className="text-yellow-400">Feel Confident.</span>
          </h1>

          {/* Description */}
          <p className="hero-description mt-6 max-w-xl text-lg leading-relaxed text-stone-300">
            Professional haircuts and grooming services designed
            to make you look and feel your best.
          </p>

          {/* CTA */}
          <div className="hero-button">
            <Link
              to="/book"
              className="mt-8 inline-block rounded-full bg-yellow-500 px-8 py-4 font-bold text-black transition duration-300 hover:scale-105 hover:bg-yellow-400"
            >
              Book Your Appointment
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;

