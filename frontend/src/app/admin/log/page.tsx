// import { AdminLeft } from "@/app/_components/adminLeft";

// export default function Log() {
//   return (
//     <>
//       <main className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
//         <AdminLeft />
//         <div className="p-6 rounded-lg shadow-md w-screen">
//           <h2 className="text-2xl font-bold mb-6">
//             🧾 Log Aktivitas Admin & Moderator
//           </h2>

//           {/* Filter dan Pencarian */}
//           <div className="flex flex-wrap gap-4 mb-4">
//             <input
//               type="text"
//               placeholder="🔍 Cari nama admin/moderator..."
//               className="input input-bordered w-full max-w-xs"
//             />
//             <select className="select select-bordered">
//               <option value="">Semua Aksi</option>
//               <option>Tambah Event</option>
//               <option>Hapus Postingan</option>
//               <option>Nonaktifkan Komentar</option>
//               <option>Tindak Pelanggaran</option>
//             </select>
//             <select className="select select-bordered">
//               <option value="">Semua Peran</option>
//               <option>Admin</option>
//               <option>Moderator</option>
//             </select>
//             <button className="btn btn-primary btn-sm">🔎 Cari</button>
//           </div>

//           {/* Tabel Log Aktivitas */}
//           <div className="overflow-x-auto text-sm">
//             <table className="table table-zebra">
//               <thead className="bg-base-200">
//                 <tr>
//                   <th>🕒 Waktu</th>
//                   <th>👤 Nama</th>
//                   <th>🎯 Aksi</th>
//                   <th>📝 Detail</th>
//                   <th>🧩 Peran</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>24 Jun 2025 • 20:30</td>
//                   <td>Risky</td>
//                   <td>
//                     <span className="badge badge-primary">Tambah Event</span>
//                   </td>
//                   <td>Lomba Desain Ramadan</td>
//                   <td>
//                     <span className="badge badge-success">Admin</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>24 Jun 2025 • 20:15</td>
//                   <td>Aulia</td>
//                   <td>
//                     <span className="badge badge-warning">
//                       Tindak Pelanggaran
//                     </span>
//                   </td>
//                   <td>Post ID: 982 (spam)</td>
//                   <td>
//                     <span className="badge badge-info">Moderator</span>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>24 Jun 2025 • 20:00</td>
//                   <td>Risky</td>
//                   <td>
//                     <span className="badge badge-error">Hapus Postingan</span>
//                   </td>
//                   <td>Karya ID: 221</td>
//                   <td>
//                     <span className="badge badge-success">Admin</span>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }
