'use client'
import { AdminLeft } from "../_components/adminLeft";
import Link from "next/link";

export default function Pengguna() {
  return (
    <>
      <main className="flex lg:flex-row flex-col bg-gray-100 min-h-screen">
        <AdminLeft />
        <div className="shadow p-6 rounded-xl w-screen overflow-x-auto">
          <div>
            <h2 className="mb-4 font-semibold text-xl">👥 Daftar Pengguna</h2>

            <input
              type="text"
              placeholder="Cari pengguna..."
              className="mb-4 input-bordered w-full max-w-xs input"
            />
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Profil</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {/* Contoh baris statis */}
                <tr>
                  <th>1</th>
                  <td>
                    <img
                      src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                      className="rounded-full w-10 h-10"
                    />
                  </td>
                  <td>wahyudi</td>
                  <td>wahyudi@email.com</td>
                  <td>User</td>
                  <td>
                    <span className="badge badge-success">Aktif</span>
                  </td>
                  <td className="space-x-2">
                    <Link href="/admin/pengguna/123">
                      <button className="btn btn-xs btn-info">Detail</button>
                    </Link>
                    <button className="btn btn-xs btn-warning">Suspend</button>
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
