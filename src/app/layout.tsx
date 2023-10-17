import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// import Script from 'next/script'
import Header from '@/components/common/Header'
import Player from '@/components/common/Player'
import Sidebar from '@/components/common/Sidebar'
import Providers from '@/components/provider/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Team-C Spotify Web player',
  description: 'ASAC spotify clone project generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log('layout rendered')
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <main className="bg-color-background-primary w-full h-screen grid grid-cols-[max-content_auto] grid-rows-[1fr_auto] px-4 gap-2">
            <Sidebar />
            <div className="flex flex-col h-[calc(100vh-72px)s] overflow-y-auto mb-20 px-2 z-20">
              <Header type={''} />
              {children}
            </div>
            <div className="fixed bottom-0 col-span-2 h-[72px]">
              <Player />
            </div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
