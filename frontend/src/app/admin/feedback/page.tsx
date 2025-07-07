// import { AdminLeft } from "@/app/_components/adminLeft";

// export default function Feedback() {
//   return (
//     <>
//       <main className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
//         <AdminLeft />
//         <div className="p-6 rounded-lg shadow-md w-screen">
//             <h2 className="text-2xl font-bold mb-6">
//               💌 Feedback dari Pengguna
//             </h2>

//             {/* Filter & Search */}
//             <div className="flex flex-wrap gap-4 mb-4">
//               <input
//                 type="text"
//                 placeholder="🔍 Cari nama atau isi feedback..."
//                 className="input input-bordered w-full max-w-xs"
//               />
//               <select className="select select-bordered">
//                 <option>Semua Status</option>
//                 <option>Belum Dibaca</option>
//                 <option>Sudah Dibaca</option>
//                 <option>Ditindaklanjuti</option>
//               </select>
//               <button className="btn btn-primary btn-sm">🔎 Cari</button>
//             </div>

//             {/* Tabel Feedback */}
//             <div className="overflow-x-auto text-sm">
//               <table className="table table-zebra">
//                 <thead className="bg-base-200">
//                   <tr>
//                     <th>🕒 Tanggal</th>
//                     <th>👤 Nama</th>
//                     <th>📨 Email</th>
//                     <th>🎯 Tipe</th>
//                     <th>💬 Isi</th>
//                     <th>📌 Status</th>
//                     <th>⚙️ Aksi</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>24 Jun 2025</td>
//                     <td>@vectorqueen</td>
//                     <td>vectorqueen@gmail.com</td>
//                     <td>
//                       <span className="badge badge-info">Saran</span>
//                     </td>
//                     <td>Tambah fitur like di komentar dong kak 🙏</td>
//                     <td>
//                       <span className="badge badge-warning">Belum Dibaca</span>
//                     </td>
//                     <td>
//                       <button className="btn btn-xs btn-success">
//                         Tandai Dibaca
//                       </button>
//                     </td>
//                   </tr>
//                   <tr>
//                     <td>23 Jun 2025</td>
//                     <td>Anonim</td>
//                     <td>-</td>
//                     <td>
//                       <span className="badge badge-error">Bug</span>
//                     </td>
//                     <td>Waktu upload error pas file besar</td>
//                     <td>
//                       <span className="badge badge-neutral">
//                         Ditindaklanjuti
//                       </span>
//                     </td>
//                     <td>
//                       <button className="btn btn-xs btn-ghost">Detail</button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//         </div>
//       </main>
//     </>
//   );
// }
