'use client'
import { useParams } from 'next/navigation'

export default function DetailPengguna() {
  const { id } = useParams()

  const dummyUser = {
    nama: 'wahuydi',
    avatar: 'https://img.daisyui.com/images/profile/demo/yellingcat@192.webp',
    joinDate: '30 Januari 2025',
    status: 'Aktif',
    totalPostingan: 8,
    totalLike: 120,
    badges: ['👑 Kreator Aktif', '🎨 Peserta Event Ramadan'],
    level: 3,
  }

  return (
    <div className="bg-white shadow mx-auto p-6 rounded-xl max-w-3xl">
      <div className="flex items-center space-x-4 mb-6">
        <img src={dummyUser.avatar} className="rounded-full w-20 h-20" />
        <div>
          <h2 className="font-bold text-2xl">{dummyUser.nama}</h2>
          <p className="text-gray-500 text-sm">Bergabung sejak {dummyUser.joinDate}</p>
          <span className="badge badge-success">{dummyUser.status}</span>
        </div>
      </div>

      <div className="gap-4 grid grid-cols-2 mb-6">
        <div className="bg-gray-50 shadow p-4 rounded text-center">
          <p className="text-gray-500 text-sm">Total Postingan</p>
          <p className="font-semibold text-xl">{dummyUser.totalPostingan}</p>
        </div>
        <div className="bg-gray-50 shadow p-4 rounded text-center">
          <p className="text-gray-500 text-sm">Total Like</p>
          <p className="font-semibold text-xl">{dummyUser.totalLike}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-2 font-semibold">Badge Dimiliki:</p>
        <div className="flex flex-wrap gap-2">
          {dummyUser.badges.map((badge, i) => (
            <span key={i} className="badge-outline badge badge-info">{badge}</span>
          ))}
        </div>
      </div>

      <div className="space-x-3 mt-6">
        <button className="btn btn-warning btn-sm">Suspend</button>
        <button className="btn btn-error btn-sm">Hapus Akun</button>
      </div>
    </div>
  )
}
