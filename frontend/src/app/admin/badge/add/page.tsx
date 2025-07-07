"use client";
import { useState } from "react";

export default function TambahBadgeEvent() {
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Di sini nanti bisa kirim data ke server
    console.log({ nama, deskripsi });
    alert("Badge berhasil ditambahkan!");
  };

  return (
    <div className="bg-white shadow mx-auto mt-10 p-6 rounded-xl max-w-xl">
      <h2 className="mb-6 font-bold text-2xl">🎖️ Tambah Badge Event</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Nama Badge */}
        <div>
          <label className="label">
            <span className="font-semibold label-text">Nama Badge</span>
          </label>
          <input
            type="text"
            placeholder="Contoh: Peserta Ramadan 2025"
            className="input-bordered w-full input"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        {/* Input Deskripsi Badge */}
        <div>
          <label className="label">
            <span className="font-semibold label-text">Deskripsi Badge</span>
          </label>
          <textarea
            className="textarea-bordered w-full textarea"
            placeholder="Deskripsi singkat tentang badge"
            rows={4}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
          />
        </div>

        {/* Tombol Submit */}
        <div className="text-right">
          <button type="submit" className="btn btn-primary">
            Tambahkan Badge
          </button>
        </div>
      </form>
    </div>
  );
}
