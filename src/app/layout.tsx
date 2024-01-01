import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ClerkProvider, auth } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast'
const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ weight: ["400", "500", "600", '700'], subsets: ["latin"] })


export const metadata: Metadata = {
  title: 'NYN: New Year\'s Nonsense',
  description: ' Resolutions: Unboring them since 2023',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <Toaster />
          <Navbar />
          {children}</body>
      </html>
    </ClerkProvider>
  )
}
