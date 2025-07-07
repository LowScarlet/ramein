"use client";
import { useState } from "react";

export default function TambahPengumuman() {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState("Aktif");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ judul, isi, status });
    alert("Pengumuman berhasil ditambahkan!");
  };

  return (
    <div className="bg-white shadow mx-auto mt-10 p-6 rounded-xl max-w-2xl">
      <h2 className="mb-6 font-bold text-2xl">📢 Tambah Pengumuman</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Judul */}
        <div>
          <label className="label">
            <span className="font-semibold label-text">Judul Pengumuman</span>
          </label>
          <input
            type="text"
            className="input-bordered w-full input"
            placeholder="Contoh: Update Fitur Baru"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
        </div>

        {/* Isi Pengumuman */}
        <div>
          <label className="label">
            <span className="font-semibold label-text">Isi Pengumuman</span>
          </label>
          <textarea
            className="textarea-bordered w-full textarea"
            placeholder="Tulis isi atau detail pengumuman..."
            rows={5}
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            required
          />
        </div>
        {/* Tombol Submit */}
        <div className="text-right">
          <button type="submit" className="btn btn-primary">
            Tambah Pengumuman
          </button>
        </div>
      </form>
    </div>
  );
}
