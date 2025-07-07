"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPengumuman() {
  const { id } = useParams();

  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState("Aktif");

  useEffect(() => {
    // Simulasi fetch pengumuman berdasarkan id
    const dummyData = {
      judul: "Update Fitur Baru!",
      isi: "Sekarang pengguna bisa ikut event dan mendapatkan badge menarik.",
      status: "Aktif",
    };

    setJudul(dummyData.judul);
    setIsi(dummyData.isi);
    setStatus(dummyData.status);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ id, judul, isi, status });
    alert("Pengumuman berhasil diperbarui!");
  };

  return (
    <div className="bg-white shadow mx-auto mt-10 p-6 rounded-xl max-w-2xl">
      <h2 className="mb-6 font-bold text-2xl">✏️ Edit Pengumuman</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Judul */}
        <div>
          <label className="label">
            <span className="font-semibold label-text">Judul Pengumuman</span>
          </label>
          <input
            type="text"
            className="input-bordered w-full input"
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
            rows={5}
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
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
