export function Stats() {
  return (
    <div className="space-y-4 card">
      <div className="space-y-4 bg-base-100 bg-white shadow shadow-sm p-4 rounded-lg w-60 h-70">
        {/* Level */}
        <div className="text-center">
          <p className="font-bold text-purple-600 text-3xl">Level 2</p>
          <p className="text-gray-500 text-sm">Pendatang Aktif</p>
        </div>
        {/* Progress Bar */}
        <div>
          <p className="text-gray-500 text-sm">menuju level 3 : 70%</p>
          <progress
            className="w-56 progress progress-primary"
            value="70"
            max="100"
          ></progress>
          <p className="text-gray-500 text-sm">150/250 XP</p>
          <div className="flex justify-center items-center">
            <p className="mt-4 text-gray-500 text-sm">
              Kegiatan kamu dalam mengapresiasi keren, lanjutkan ya!
            </p>
          </div>
        </div>
      </div>
      {/* Badges */}
      <div className="top-20 sticky space-y-4 bg-base-100 bg-white shadow shadow-sm p-4 rounded-lg w-60 h-89">
        <p className="font-semibold text-sm">Badge</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="bg-yellow-100 px-3 py-1 rounded-full text-yellow-800 text-sm">
            🔥 Aktif 30 Hari
          </span>
          <span className="bg-blue-100 px-3 py-1 rounded-full text-blue-800 text-sm">
            🎨 12 Karya
          </span>
          <span className="bg-purple-100 px-3 py-1 rounded-full text-purple-800 text-sm">
            🧠 Mentor UI/UX
          </span>
          <span className="bg-purple-100 px-3 py-1 rounded-full text-grey-800 text-sm">
            Lainnya
          </span>
        </div>

        {/* Statistik Angka */}
        <p className="mt-4 font-semibold text-sm">Statistik</p>
        <div className="gap-2 grid grid-cols-2">
          <div className="bg-yellow-100 p-3 rounded-lg text-center">
            <p className="font-bold text-yellow-600 text-xl">18</p>
            <p className="text-sm">Karya</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg text-center">
            <p className="font-bold text-blue-600 text-xl">230</p>
            <p className="text-sm">Like</p>
          </div>
        </div>
      </div>
    </div>
  );
}
