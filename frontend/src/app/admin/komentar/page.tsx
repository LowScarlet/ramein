import { AdminLeft } from "../_components/adminLeft";
import Link from "next/link";

export default function Komentar() {
  return (
    <>
      <main className="flex lg:flex-row flex-col bg-gray-100 min-h-screen">
        <AdminLeft />
        <div className="shadow-md p-6 rounded-lg w-screen">
          <h2 className="mb-4 font-bold text-2xl">🚩 Komentar Dilaporkan</h2>

          {/* Info ringkas */}
          <div className="mb-4 alert alert-warning">
            <span>
              Menampilkan hanya komentar yang telah dilaporkan oleh pengguna.
            </span>
          </div>

          {/* Filter pencarian */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Cari komentar atau pengguna..."
              className="input-bordered w-full max-w-sm input"
            />
            <select className="select-bordered select">
              <option>Urutkan: Terbaru</option>
              <option>Urutkan: Terlama</option>
              <option>Urutkan: Paling banyak laporan</option>
            </select>
          </div>

          {/* Tabel Komentar Dilaporkan */}
          <div className="overflow-x-auto">
            <table className="table table-zebra text-sm">
              <thead className="bg-base-200 text-base-content">
                <tr>
                  <th>#</th>
                  <th>Komentar</th>
                  <th>Pengguna</th>
                  <th>Jumlah Laporan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {/* Baris 1 */}
                <tr>
                  <td>1</td>
                  <td>"Desain kamu norak, out of trend!"</td>
                  <td>@userrandom</td>
                  <td>
                    <span className="badge badge-error">3 Laporan</span>
                  </td>
                  <td className="space-x-1">
                    <Link href="/admin/komentar/123">
                      <button className="btn btn-xs btn-info">Detail</button>
                    </Link>
                    <button className="btn btn-xs btn-error">Hapus</button>
                    <button className="btn btn-xs btn-success">
                      Tandai Aman
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
