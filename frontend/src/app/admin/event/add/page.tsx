'use client'

import { useState, useEffect } from 'react'

export default function TambahEvent() {
  const [form, setForm] = useState({
    judul: '',
    tanggalMulai: '',
    tanggalSelesai: '',
    badge: '',
  })

  // Simulasi ambil badge dari backend/menu badge
  const [badgeList, setBadgeList] = useState([])

  useEffect(() => {
    // Misal ambil badge event dari local/dummy
    const dummyBadge = [
      { id: 'badge1', nama: '🎖️ Ramadan 2025' },
      { id: 'badge2', nama: '🏆 Desain Nasional' },
    ]
    setBadgeList(dummyBadge)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Event disubmit:', form)
    // Di sini bisa kirim ke backend atau API
  }

  return (
    <div className="bg-white shadow mx-auto mt-10 p-6 rounded-xl max-w-2xl">
      <h2 className="mb-6 font-bold text-2xl">🗓️ Tambah Event Baru</h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Judul */}
        <div>
          <label className="label">
            <span className="label-text">Judul Event</span>
          </label>
          <input
            type="text"
            placeholder="Contoh: Ramadan Kreatif 2025"
            className="input-bordered w-full input"
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            required
          />
        </div>

        {/* Tanggal */}
        <div>
          <label className="label">
            <span className="label-text">Tanggal Pelaksanaan</span>
          </label>
          <div className="flex gap-4">
            <input
              type="date"
              className="input-bordered w-full input"
              value={form.tanggalMulai}
              onChange={(e) => setForm({ ...form, tanggalMulai: e.target.value })}
              required
            />
            <span className="mt-2">–</span>
            <input
              type="date"
              className="input-bordered w-full input"
              value={form.tanggalSelesai}
              onChange={(e) => setForm({ ...form, tanggalSelesai: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Badge Hadiah */}
        <div>
          <label className="label">
            <span className="label-text">Badge Hadiah</span>
          </label>
          <select
            className="w-full select-bordered select"
            value={form.badge}
            onChange={(e) => setForm({ ...form, badge: e.target.value })}
            required
          >
            <option value="" disabled>Pilih badge hadiah</option>
            {badgeList.map((badge) => (
              <option key={badge.id} value={badge.id}>{badge.nama}</option>
            ))}
          </select>
        </div>

        {/* Tombol Simpan */}
        <div className="text-right">
          <button type="submit" className="btn btn-primary">
            Simpan Event
          </button>
        </div>

      </form>
    </div>
  )
}
