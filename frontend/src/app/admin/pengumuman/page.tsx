import { AdminLeft } from "../_components/adminLeft";
import Link from "next/link";

export default function Badge() {
  return (
    <>
      <main className="flex lg:flex-row flex-col bg-gray-100 min-h-screen">
        <AdminLeft />
        <div className="shadow-md p-6 rounded-lg w-screen">
          <h2 className="mb-6 font-bold text-2xl">📢 Manajemen Pengumuman</h2>

          {/* Tombol Tambah */}
          <div className="flex justify-end mb-4">
            <Link href="/admin/pengumuman/add">
              <button className="btn btn-primary btn-sm">
                ➕ Tambah Badge
              </button>
            </Link>
          </div>

          {/* Tabel Pengumuman */}
          <div className="overflow-x-auto">
            <table className="table table-zebra text-sm">
              <thead className="bg-base-200">
                <tr>
                  <th>📛 Judul</th>
                  <th>Isi Pengumuman</th>
                  <th>📌 Status</th>
                  <th>⚙️ Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Fitur Komentar Sudah Tersedia!</td>
                  <td>Fitur komentar udah tersedia nih, gas cobain</td>
                  <td>
                    <span className="badge badge-success">Aktif</span>
                  </td>
                  <td className="space-x-1">
                    <Link href="/admin/pengumuman/1">
                      <button className="btn btn-xs btn-info">Edit</button>
                    </Link>
                    <button className="btn btn-xs btn-warning">
                      Nonaktifkan
                    </button>
                    <button className="btn btn-xs btn-error">Hapus</button>
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
