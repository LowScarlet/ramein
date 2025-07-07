"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditBadgeEvent() {
  const { id } = useParams();

  // Dummy data, nanti ganti dari fetch API by ID
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  useEffect(() => {
    // Simulasi fetch data dari ID
    // Nanti bisa ganti ini dengan ambil data dari server
    const dataDummy = {
      nama: " 🌙 Ramadan 2025",
      deskripsi: "Meramaikan Event Ramadan 2025.",
    };

    setNama(dataDummy.nama);
    setDeskripsi(dataDummy.deskripsi);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ id, nama, deskripsi });
    alert("Badge event berhasil diperbarui!");
  };

  return (
    <div className="bg-white shadow mx-auto mt-10 p-6 rounded-xl max-w-xl">
      <h2 className="mb-6 font-bold text-2xl">✏️ Edit Badge Event</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Nama Badge */}
        <div>
          <label className="label">
            <span className="font-semibold label-text">Nama Badge</span>
          </label>
          <input
            type="text"
            className="input-bordered w-full input"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        {/* Input Deskripsi */}
        <div>
          <label className="label">
            <span className="font-semibold label-text">Deskripsi Badge</span>
          </label>
          <textarea
            className="textarea-bordered w-full textarea"
            rows={4}
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
          />
        </div>

        {/* Tombol Simpan */}
        <div className="text-right">
          <button type="submit" className="btn btn-primary">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}
