export function AdminLeft() {
  return (
    <>
      <div className="menu bg-base-200 w-64 min-h-screen p-4">
        <h2 className="text-lg font-bold mb-4">Admin Ramein</h2>

        <ul className="space-y-1">
          <li>
            <a href="/admin" className="btn btn-ghost justify-start">
              <span>📊</span> Dashboard
            </a>
          </li>
          <li>
            <a href="/admin/pengguna" className="btn btn-ghost justify-start">
              <span>👥</span> Pengguna
            </a>
          </li>
          <li>
            <a href="/admin/postingan" className="btn btn-ghost justify-start">
              <span>🖼️</span> Postingan
            </a>
          </li>
          <li>
            <a href="/admin/komentar" className="btn btn-ghost justify-start">
              <span>🗣️</span> Komentar
            </a>
          </li>
          <li>
            <a href="/admin/laporan" className="btn btn-ghost justify-start">
              <span>🚩</span> Laporan
            </a>
          </li>
          <li>
            <a href="/admin/badge" className="btn btn-ghost justify-start">
              <span>🏅</span> Badge & Level
            </a>
          </li>
          <li>
            <a href="/admin/event" className="btn btn-ghost justify-start">
              <span>📅</span> Event
            </a>
          </li>
          <li>
            <a href="/admin/pengumuman" className="btn btn-ghost justify-start">
              <span>📢</span> Pengumuman
            </a>
          </li>
          {/* <li>
            <a href="/admin/log" className="btn btn-ghost justify-start">
              <span>🧾</span> Log Aktivitas
            </a>
          </li>
          <li>
            <a href="/admin/feedback" className="btn btn-ghost justify-start">
              <span>📬</span> Feedback
            </a>
          </li> */}
        </ul>
      </div>
    </>
  );
}
