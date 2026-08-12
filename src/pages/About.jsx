import { Link } from "react-router-dom";
import aboutBarber from "../assets/about-barber.png";

function About() {
  return (
    <main className="bg-stone-950 text-white">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden px-6 py-20 md:px-12 md:py-28">

        {/* Background glow */}
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">

          {/* Text */}
          <div className="animate-fade-up">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
              About Us
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
              More Than Just
              <span className="block text-yellow-400">
                A Haircut.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-stone-400">
              We believe a great haircut is more than changing
              your look. It's about confidence, comfort and
              taking a little time for yourself.
            </p>

            <div className="mt-8">
              <Link
                to="/book"
                className="inline-flex rounded-full bg-yellow-500 px-7 py-3 font-semibold text-black transition hover:bg-yellow-400"
              >
                Book Your Appointment
              </Link>
            </div>

          </div>


              {/* Visual */}
              <div className="relative">

                {/* Main Image */}
                <div className="aspect-square overflow-hidden rounded-3xl border border-stone-800 bg-stone-900">
                  <img
                    src={aboutBarber}
                    alt="Professional barber providing grooming service"
                    className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-stone-950/50 via-transparent to-transparent" />
                </div>

                {/* Small floating card */}
                <div className="absolute -bottom-6 -left-6 rounded-2xl border border-stone-700 bg-stone-900 px-6 py-5 shadow-xl">
                  <p className="text-2xl font-bold text-yellow-400">
                    100%
                  </p>

                  <p className="mt-1 text-sm text-stone-400">
                    Customer focused
                  </p>
                </div>

              </div>

        </div>
      </section>


      {/* ================= OUR STORY ================= */}
      <section className="border-t border-stone-900 px-6 py-20 md:px-12">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-12 md:grid-cols-2 md:items-center">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
                Our Story
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                A place where style meets comfort.
              </h2>

            </div>

            <div className="space-y-5 text-stone-400 leading-7">

              <p>
                Our salon was built with a simple idea: give
                every customer a comfortable place to look
                their best and feel their best.
              </p>

              <p>
                From a classic haircut to a clean beard trim,
                we focus on quality, attention to detail and
                making every visit worth your time.
              </p>

              <p>
                We keep things simple — great service,
                friendly conversations and a look you'll be
                happy to walk out with.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-stone-900 px-6 py-20 md:px-12">

        <div className="mx-auto max-w-6xl">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
              Why Choose Us
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              We care about the details.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-stone-400">
              Every appointment is designed to give you
              quality service without unnecessary hassle.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {/* Card 1 */}
            <div className="rounded-2xl border border-stone-800 bg-stone-950 p-7 transition hover:-translate-y-1 hover:border-yellow-500/40">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-2xl">
                ✂️
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                Quality Service
              </h3>

              <p className="mt-3 leading-7 text-stone-500">
                We focus on precision, cleanliness and
                attention to detail in every service.
              </p>

            </div>


            {/* Card 2 */}
            <div className="rounded-2xl border border-stone-800 bg-stone-950 p-7 transition hover:-translate-y-1 hover:border-yellow-500/40">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-2xl">
                ⏰
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                Your Time Matters
              </h3>

              <p className="mt-3 leading-7 text-stone-500">
                Book your appointment in advance and avoid
                unnecessary waiting.
              </p>

            </div>


            {/* Card 3 */}
            <div className="rounded-2xl border border-stone-800 bg-stone-950 p-7 transition hover:-translate-y-1 hover:border-yellow-500/40">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/10 text-2xl">
                ❤️
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                Customer First
              </h3>

              <p className="mt-3 leading-7 text-stone-500">
                We want every customer to leave feeling
                confident and satisfied.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="px-6 py-20 md:px-12">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-stone-800 bg-stone-900 px-6 py-14 text-center md:px-12">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            Ready for a fresh look?
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Let's make your next visit worth it.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-stone-400">
            Choose your service, pick a convenient time and
            book your appointment in just a few clicks.
          </p>

          <Link
            to="/book"
            className="mt-8 inline-flex rounded-full bg-yellow-500 px-8 py-3 font-semibold text-black transition hover:bg-yellow-400"
          >
            Book Now
          </Link>

        </div>

      </section>

    </main>
  );
}

export default About;