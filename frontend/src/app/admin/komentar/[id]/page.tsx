'use client'
import { useParams } from 'next/navigation'

export default function DetailKomentar() {
  const { id } = useParams()

  // Data dummy
  const komentar = {
    isi: '"Desain kamu norak, out of trend!"',
    oleh:'@userrandom',
    tanggal: '27 Juni 2025, 14:05',
    pelapor: 3,
    status: 'Belum Ditinjau',
  }

  const karya = {
    id: 'post456',
    judul: 'Poster Ramadhan 2025',
    gambar: 'https://source.unsplash.com/400x250/?poster,ramadhan',
    pengguna: {
      username: '@ayuDesign',
      avatar: 'https://i.pravatar.cc/100?u=ayu',
    },
  }

  return (
    <div className="bg-white shadow-md mx-auto mt-6 p-6 rounded-xl max-w-3xl">
      <h2 className="mb-4 font-bold text-2xl">💬 Detail Komentar</h2>

      <div className="mb-4">
        <p className="text-gray-800 italic">"{komentar.isi}"</p>
        <p className="mt-1 text-gray-500 text-sm">Dikirim pada {komentar.tanggal}</p>
        <p className="mt-1 text-gray-500 text-sm">Oleh {komentar.oleh}</p>
        <p className="mt-1 text-red-500 text-sm">{komentar.pelapor} Laporan</p>
      </div>

      <div className="mt-6">
        <h3 className="mb-2 font-semibold">📄 Dikirim di Karya:</h3>
        <div className="flex items-center gap-4 bg-gray-50 shadow-sm p-4 rounded-lg">
          <img src={karya.gambar} className="rounded w-32 h-20 object-cover" />
          <div>
            <p className="font-semibold">{karya.judul}</p>
            <div className="flex items-center gap-2 mt-1">
              <img src={karya.pengguna.avatar} className="rounded-full w-6 h-6" />
              <span className="text-gray-600 text-sm">{karya.pengguna.username}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button className="btn btn-error btn-sm">Hapus Komentar</button>
        <button className="btn btn-success btn-sm">Tandai Aman</button>
      </div>
    </div>
  )
}
