export function RightNav() {
  return (
    <div className="w-72 min-h-screen">
      <div className="top-20 sticky space-y-6 p-4">
        {/* Pengguna Baru */}
        <div className="bg-white shadow-md p-4 rounded-xl">
          <h3 className="flex items-center gap-2 mb-3 font-semibold text-lg">
            👥 Pengguna Baru Minggu Ini
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>
              <span className="font-medium text-blue-600">@wahuydi</span>
            </li>
            <li>
              <span className="font-medium text-blue-600">@okta.draws</span>
            </li>
            <li>
              <span className="font-medium text-blue-600">@adelux</span>
            </li>
            <li>
              <span className="font-medium text-blue-600">@rahma.fx</span>
            </li>
          </ul>
        </div>

        {/* Event Bulanan */}
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 shadow-md p-4 rounded-xl">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-lg">
            🎉 Event Bulanan
          </h3>
          <div className="space-y-1 text-gray-800 text-sm">
            <p>
              <strong>Challenge:</strong> Poster Peduli Lingkungan
            </p>
            <p>
              <strong>🗓️ Deadline:</strong>{" "}
              <span className="font-semibold text-red-600">30 Juni 2025</span>
            </p>
            <button className="mt-2 btn-outline btn btn-xs btn-accent">
              Lihat Detail
            </button>
          </div>
        </div>

        {/* Tips & Trik */}
        <div className="bg-yellow-100 shadow-md p-4 rounded-xl">
          <h3 className="flex items-center gap-2 mb-2 font-semibold text-lg">
            💡 Tips & Trik
          </h3>
          <p className="text-gray-700 text-sm italic">
            "Gunakan{" "}
            <span className="font-semibold text-purple-600">kontras warna</span>{" "}
            untuk menonjolkan elemen utama."
          </p>
        </div>
      </div>
    </div>
  );
}
