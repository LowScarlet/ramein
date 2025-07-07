import { Header } from "../_components/header";

export default function Leaderboard() {
  return (
    <>
      <Header />
      <main className="flex justify-center gap-4 bg-blue-100 p-4 min-h-screen">
        <div>
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 shadow-md mb-6 p-6 rounded-xl text-white">
            <h2 className="gap-2 mb-1 font-bold text-2xl text-center">
              🏆 Leaderboard Komunitas
            </h2>
            <p className="text-white/90 text-sm text-center">
              Siapa yang paling aktif minggu ini? Cek di bawah.
            </p>

            <div className="flex flex flex-wrap justify-center gap-2 mt-4">
              <button className="bg-white hover:bg-purple-100 text-purple-700 btn btn-sm">
                🔥 Paling Aktif
              </button>
              <button className="bg-white hover:bg-purple-100 text-purple-700 btn btn-sm">
                🎖️ Badge Terbanyak
              </button>
              <button className="bg-white hover:bg-purple-100 text-purple-700 btn btn-sm">
                🏅 Level Tertinggi
              </button>
              <button className="bg-white hover:bg-purple-100 text-purple-700 btn btn-sm">
                🗨️ Sang Komentator
              </button>
            </div>
          </div>
          <div className="space-y-6 mt-6">
            {/* PODIUM TOP 3 */}
            <div className="flex justify-center gap-4">
              {/* Posisi #2 */}
              <div className="bg-gray-800 opacity-80 shadow p-3 rounded-xl w-28 text-white text-center">
                <img
                  src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                  className="mb-2 rounded w-full h-20 object-cover"
                />
                <p className="font-bold text-sm truncate">wahuydi</p>
                <p className="mt-1 text-gray-300 text-xs">⭐ 26</p>
                <p className="mt-1 text-lg">🥈</p>
              </div>

              {/* Posisi #1 */}
              <div className="bg-gray-800 shadow p-4 border-2 border-blue-400 rounded-xl w-32 text-white text-center scale-110">
                <img
                  src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                  className="mb-2 rounded w-full h-24 object-cover"
                />
                <p className="font-bold text-sm truncate">adi ajah</p>
                <p className="mt-1 text-gray-300 text-xs">⭐ 30</p>
                <p className="mt-1 text-lg">🥇</p>
              </div>

              {/* Posisi #3 */}
              <div className="bg-gray-800 opacity-80 shadow p-3 rounded-xl w-28 text-white text-center">
                <img
                  src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                  className="mb-2 rounded w-full h-20 object-cover"
                />
                <p className="font-bold text-sm truncate">Nostalgia</p>
                <p className="mt-1 text-gray-300 text-xs">⭐ 25</p>
                <p className="mt-1 text-lg">🥉</p>
              </div>
            </div>

            {/* LIST RANKING 4–10 */}
            <div className="space-y-3">
              {[
                { rank: 4, title: "Bro nge-cheat", likes: 18 },
                { rank: 5, title: "Trio apa lagi ini", likes: 18 },
                { rank: 6, title: "Ofkors", likes: 17 },
                { rank: 7, title: "Bruhhh 💀", likes: 17 },
                { rank: 8, title: "Khayalan cowok terlalu sesat", likes: 17 },
              ].map((item) => (
                <div
                  key={item.rank}
                  className="flex justify-between items-center bg-gray-900 shadow p-3 rounded-lg text-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 font-bold text-gray-400 text-sm">
                      {item.rank}
                    </span>
                    <img
                      src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                      className="rounded w-8 h-8 object-cover"
                    />
                    <p className="max-w-[160px] text-sm truncate">
                      {item.title}
                    </p>
                  </div>
                  <p className="text-gray-300 text-xs">⭐ {item.likes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}