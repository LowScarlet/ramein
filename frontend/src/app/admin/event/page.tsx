import { AdminLeft } from "../_components/adminLeft";
import Link from "next/link";

export default function Event() {
  return (
    <>
      <main className="flex lg:flex-row flex-col bg-gray-100 min-h-screen">
        <AdminLeft />
        <div className="shadow-md p-6 rounded-lg w-screen">
          <h2 className="mb-6 font-bold text-2xl">
            📅 Manajemen Event Komunitas
          </h2>

          {/* Tombol Tambah Event */}
          <div className="flex justify-end mb-4">
            <Link href="/admin/event/add">
              <button className="btn btn-primary btn-sm">
                ➕ Tambah Event
              </button>
            </Link>
          </div>

          {/* Tabel Event */}
          <div className="overflow-x-auto">
            <table className="table table-zebra text-sm">
              <thead className="bg-base-200">
                <tr>
                  <th>📛 Judul</th>
                  <th>🗓️ Tanggal</th>
                  <th>🎖️ Badge Hadiah</th>
                  <th>📌 Status Event</th>
                  <th>⚙️ Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ramaikan Event Ramadhan 2025</td>
                  <td>1–17 Agustus 2025</td>
                  <td>
                    <span className="badge badge-warning">
                      🌙 Ramadhan 2025
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success">Aktif</span>
                  </td>
                  <td className="space-x-1">
                    <Link href="/admin/event/1">
                      <button className="btn btn-xs btn-info">Detail</button>
                    </Link>
                    <button className="btn btn-xs btn-warning">
                      Tutup Event
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}
