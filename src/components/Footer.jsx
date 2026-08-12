
import { HiMiniScissors, HiOutlinePhone, HiOutlineMapPin } from "react-icons/hi2";

function Footer() {
  return (
    <footer className="border-t border-stone-800 bg-stone-950 px-6 py-10 text-stone-400">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 md:grid-cols-3">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-stone-200">
            <HiMiniScissors className="text-yellow-500" />
            <span>CUTTINGKING</span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-stone-500">
            Professional haircuts and grooming services
            for a sharp and confident look.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 font-semibold text-white">
            Contact
          </h3>

          <div className="space-y-3 text-sm">

            <a
              href="tel:1234567890"
              className="flex items-center gap-2 transition hover:text-yellow-400"
            >
              <HiOutlinePhone className="text-yellow-500" />
              <span>1234567890</span>
            </a>

            <div className="flex items-start gap-2">
              <HiOutlineMapPin className="mt-0.5 shrink-0 text-yellow-500" />
              <span>
                Vill - Bijwara,
                <br />
                Main Market, near XYZ Shop
              </span>
            </div>

          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="mb-4 font-semibold text-white">
            Find Us
          </h3>

          <p className="mb-4 text-sm text-stone-500">
            Visit our shop in Bijwara Main Market.
          </p>

          <a
            href="https://maps.app.goo.gl/bUKLbxTL6xF1TyzRA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-yellow-500 px-5 py-2 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
          >
            View on Google Maps
          </a>
        </div>

      </div>

      {/* Copyright */}
      <div className="mx-auto mt-8 max-w-6xl border-t border-stone-800 pt-6 text-center text-sm text-stone-500">
        © 2026 CUTTINGKING. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

