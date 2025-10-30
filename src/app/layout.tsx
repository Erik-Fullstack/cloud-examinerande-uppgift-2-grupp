import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Journal App',
  description: 'A minimalist journaling application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
