'use client'
import { useParams } from 'next/navigation'

export default function DetailPostingan() {
  const { id } = useParams()

  const dummyPost = {
    id,
    gambar: 'https://source.unsplash.com/600x400/?design,art',
    judul: 'Poster Ramadhan Kreatif',
    deskripsi: 'Sebuah poster yang saya buat dalam rangka menyambut bulan suci Ramadhan.',
    status: 'Aktif',
    totalLike: 120,
    totalKomentar: 10,
    pengguna: {
      id: 'user123',
      username: '@ayuDesign',
      avatar: 'https://i.pravatar.cc/100?u=ayu',
    },
  }

  return (
    <div className="bg-white shadow-md mx-auto mt-6 p-6 rounded-xl max-w-4xl">
      <h2 className="mb-4 font-bold text-2xl">📄 Detail Postingan</h2>

      <div className="mb-6">
        <img
          src={dummyPost.gambar}
          alt={dummyPost.judul}
          className="shadow-sm rounded-lg w-full h-auto"
        />
      </div>

      <div className="mb-4">
        <h3 className="font-semibold text-xl">{dummyPost.judul}</h3>
        <p className="mt-2 text-gray-600">{dummyPost.deskripsi}</p>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <img
            src={dummyPost.pengguna.avatar}
            className="rounded-full w-10 h-10"
          />
          <p className="font-medium">{dummyPost.pengguna.username}</p>
        </div>
        <span className="badge badge-success">{dummyPost.status}</span>
      </div>

      <div className="gap-4 grid grid-cols-2 mb-6">
        <div className="bg-gray-100 shadow-sm p-4 rounded text-center">
          <p className="text-gray-500 text-sm">Total Like</p>
          <p className="font-semibold text-lg">{dummyPost.totalLike}</p>
        </div>
        <div className="bg-gray-100 shadow-sm p-4 rounded text-center">
          <p className="text-gray-500 text-sm">Komentar</p>
          <p className="font-semibold text-lg">{dummyPost.totalKomentar}</p>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="btn btn-warning btn-sm">Tangguhkan</button>
        <button className="btn btn-error btn-sm">Hapus Postingan</button>
      </div>
    </div>
  )
}
