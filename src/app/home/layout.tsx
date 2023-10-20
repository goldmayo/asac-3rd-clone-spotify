import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Team-C Spotify Web player | Home',
  description: 'ASAC spotify clone project Home',
}

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  return <section className="flex flex-col mb-10 relative">{children}</section>
}
