import { HiMiniScissors } from "react-icons/hi2";

function ServiceCard({ service }) {
  return (
    <div
      className="
        group rounded-2xl border border-stone-800 bg-stone-900
        p-6 transition-all duration-300
        hover:-translate-y-2
        hover:border-yellow-500/60
        hover:shadow-lg hover:shadow-yellow-500/5
      "
    >
      {/* Service Icon */}
      <div
        className="
          mb-6 flex h-12 w-12 items-center justify-center
          rounded-xl border border-yellow-500/20
          bg-yellow-500/10 text-2xl
          transition duration-300
          group-hover:bg-yellow-500
          group-hover:text-black
        "
      >
        <HiMiniScissors 
        size={22}
        />
        
      </div>

      {/* Service Name & Price */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold text-white">
          {service.name}
        </h3>

        <span className="shrink-0 text-lg font-bold text-yellow-400">
          ₹{service.price}
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-stone-400">
        Professional {service.name.toLowerCase()} service
        designed to keep you looking your best.
      </p>

      {/* Duration */}
      <div className="mt-6 flex items-center justify-between border-t border-stone-800 pt-4">
        <span className="text-sm text-stone-500">
          Duration
        </span>

        <span className="text-sm font-medium text-stone-200">
          {service.duration} min
        </span>
      </div>
    </div>
  );
}

export default ServiceCard;

