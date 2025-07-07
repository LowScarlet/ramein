import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Halaman Tidak Di Temukan!',
}

export default async function NotFound() {
  return (
    <div className='flex flex-col h-svh'>
      Tidak Ditemukan
    </div>
  )
}