import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='bg-secondary flex custom-h items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-2xl md:text-6xl font-bold text-white mb-4'>
          Resolutions so ridiculous, <br /> they'll have you laughing into 2024.
        </h1>
        <p className='text-lg text-gray-300 mb-8'>
          Resolutions: Unboring them since 2023
        </p>
        <Link href="/create" className='bg-white text-primary font-medium py-2 px-4 rounded-md hover:bg-primary-dark'>
          Create now
        </Link>
      </div>
    </main>
  )
}
