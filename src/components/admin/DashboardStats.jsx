function DashboardStats({ stats }) {
  
   const cards = [
    {
      title: "Todays Appointments",
      value: stats?.totalAppointments ?? 0,
      icon: "📅",
    },
    {
      title: "Todays Customers",
      value: stats?.totalCustomers ?? 0,
      icon: "👥",
    },
    {
      title: "Todays Revenue",
      value: stats?.totalRevenue ?? 0,
      icon: "💰",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-stone-800 bg-stone-950 p-5"
        >
          <div className="flex items-start justify-between">
            <p className="text-sm text-stone-400">
              {card.title}
            </p>

            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 text-lg">
              {card.icon}
            </span>
          </div>

          <p className="mt-5 text-3xl font-bold text-white">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;