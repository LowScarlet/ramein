import { AdminLeft } from "./_components/adminLeft";


export default function Admin() {
  return (
    <>
      <main className="flex lg:flex-row flex-col bg-gray-100 min-h-screen">
        <AdminLeft />

        <div className="p-6">
          <h1 className="mb-6 font-bold text-3xl">📊 Dashboard Admin</h1>

          {/* Summary Cards */}
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-primary text-primary-content stats">
              <div className="stat">
                <div className="stat-title">Total Pengguna</div>
                <div className="stat-value">1,204</div>
                <div className="stat-desc">+32 hari ini</div>
              </div>
            </div>

            <div className="bg-secondary text-secondary-content stats">
              <div className="stat">
                <div className="stat-title">Total Karya</div>
                <div className="stat-value">3,562</div>
                <div className="stat-desc">+120 minggu ini</div>
              </div>
            </div>

            <div className="bg-accent text-accent-content stats">
              <div className="stat">
                <div className="stat-title">Pengguna Aktif Hari ini</div>
                <div className="stat-value">200</div>
                <div className="stat-desc"></div>
              </div>
            </div>

            <div className="bg-error text-error-content stats">
              <div className="stat">
                <div className="stat-title">Laporan Aktif</div>
                <div className="stat-value">7</div>
                <div className="stat-desc">butuh ditindak</div>
              </div>
            </div>
          </div>

          {/* Grafik & Aktivitas */}
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 mb-8">
            {/* Grafik Placeholder */}
            <div className="col-span-2 bg-white shadow p-6 rounded-xl">
              <h2 className="mb-4 font-semibold text-xl">
                📈 Aktivitas Mingguan
              </h2>
              <div className="flex justify-center items-center bg-gray-100 rounded h-40 text-gray-500">
                Grafik aktivitas akan ditampilkan di sini
              </div>
            </div>

            {/* Aktivitas Terbaru */}
            <div className="bg-white shadow p-6 rounded-xl">
              <h2 className="mb-4 font-semibold text-xl">
                🕒 Aktivitas Terbaru
              </h2>
              <ul className="space-y-3 text-sm">
                <li>
                  👤 <strong>AyuDesign</strong> mendaftar - 2 menit lalu
                </li>
                <li>
                  🖼️ <strong>FirmanX</strong> mengunggah karya baru
                </li>
                <li>
                  🗣️ <strong>LalaGZ</strong> komentar di "Poster Merdeka"
                </li>
                <li>
                  🚩 Laporan pelanggaran dari <strong>admin2</strong>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow p-6 rounded-xl">
            <h2 className="mb-4 font-semibold text-xl">⚡ Aksi Cepat</h2>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary">🔍 Tinjau Laporan</button>
              <button className="btn btn-secondary">🏅 Tambah Badge</button>
              <button className="btn btn-accent">📢 Buat Pengumuman</button>
              <button className="btn-outline btn">➕ Posting Tips</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
