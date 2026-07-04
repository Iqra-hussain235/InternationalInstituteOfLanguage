export default function Countries() {
  const countries = ["Canada", "UK", "USA", "Australia"];

  return (
    <div className="py-10 text-center">
      <h2 className="text-3xl font-bold text-primary">Top Destinations</h2>

      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {countries.map((c) => (
          <div key={c} className="bg-white shadow p-5 rounded hover:scale-105 transition">
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}