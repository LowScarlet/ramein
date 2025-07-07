import Link from "next/link";
import { AdminLeft } from "../_components/adminLeft";

export default function Badge() {
  return (
    <>
      <main className="flex lg:flex-row flex-col bg-gray-100 min-h-screen">
        <AdminLeft />
        <div className="shadow-md p-6 rounded-lg w-screen">
          <h2 className="mb-6 font-bold text-2xl">🏅 Manajemen Badge</h2>

          {/* Tabs
          <div role="tablist" className="mb-4 tabs-bordered tabs">
            <a role="tab" className="tab tab-active">
              Default Badge
            </a>
            <a role="tab" className="tab">
              Event Badge
            </a>
          </div> */}

          {/* === Tab: Default Badge === */}
          <div className="mb-8">
            <h3 className="mb-2 font-semibold text-xl">
              🎯 Badge Default (Sistem)
            </h3>
            <p className="mb-4 text-gray-500 text-sm">
              Badge ini diberikan otomatis oleh sistem dan tidak bisa diubah
              admin.
            </p>

            <div className="overflow-x-auto">
              <table className="table table-zebra text-sm">
                <thead className="bg-base-200">
                  <tr>
                    <th>Badge</th>
                    <th>Kriteria</th>
                    <th>Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="bg-blue-100 px-4 py-4 text-blue-800 badge badge-soft badge-sm">🎨 Kreator Aktif</td>
                    <td>Upload 5 karya</td>
                    <td>Pengguna harus melakukan Upload sebanyak 5 kali </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* === Tab: Event Badge === */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-xl">🎉 Badge Event (Custom)</h3>
              <Link href="/admin/badge/add">
                <button className="btn btn-primary btn-sm">
                  ➕ Tambah Badge
                </button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra text-sm">
                <thead className="bg-base-200">
                  <tr>
                    <th>Badge</th>
                    <th>Deskripsi</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="bg-yellow-100 px-4 py-4 text-yellow-800 badge badge-soft badge-sm">🌙 Ramadhan 2025</td>
                    <td>Meramaikan Event Ramadan 2025</td>
                    <td className="space-x-1">
                      <Link href="/admin/badge/1">
                        <button className="btn btn-xs btn-info">Edit</button>
                      </Link>

                      <button className="btn btn-xs btn-error">Hapus</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
