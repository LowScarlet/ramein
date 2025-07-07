"use client";
import { useParams } from 'next/navigation'

export default function DetailEvent() {
  const { id } = useParams();
  const event = {
    id: "event123",
    judul: "🎨 Ramadan Kreatif 2025",
    tanggalMulai: "2025-03-01",
    tanggalSelesai: "2025-03-30",
    badge: "🎖️ Ramadan 2025",
    deskripsi:
      "Event untuk merayakan Ramadan dengan mengunggah karya bertema Islami. Pemenang akan mendapatkan badge eksklusif.",
    status: "Berlangsung",
    jumlahPeserta: 3
    
  };

  return (
    <div className="bg-white shadow mx-auto mt-10 p-6 rounded-xl max-w-5xl">
      <div className="mb-6">
        <h2 className="mb-2 font-bold text-2xl">{event.judul}</h2>
        <p className="text-gray-500">
          {event.tanggalMulai} – {event.tanggalSelesai}
        </p>
        <span
          className={`badge mt-2 ${
            event.status === "Berlangsung" ? "badge-success" : "badge-neutral"
          }`}
        >
          {event.status}
        </span>
      </div>

      <div className="mb-6">
        <p className="font-semibold">Deskripsi Event:</p>
        <p className="text-gray-700">{event.deskripsi}</p>
      </div>

      <div className="mb-4">
        <p className="font-semibold">Badge Hadiah:</p>
        <span className="badge badge-info">{event.badge}</span>
      </div>

      <div className="mb-6">
        <p className="font-semibold">Jumlah Peserta:</p>
        <p className="text-lg">{event.jumlahPeserta} peserta</p>
      </div>

      <div className="mb-6">
        <p className="mb-2 font-semibold">Daftar Peserta:</p>
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Profil</th>
              <th>Username</th>
              <th>Tanggal Ikut</th>
              <th>Aksi</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="flex gap-3 mt-6">
        <button className="btn btn-error btn-sm">Hapus Komentar</button>
        <button className="btn btn-success btn-sm">Tandai Aman</button>
      </div>
    </div>
  );
}
