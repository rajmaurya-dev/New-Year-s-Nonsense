import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='bg-white flex custom-h items-center justify-center'>
      <div className='text-center'>
        <p className='md:text-lg text-white w-fit mx-auto px-4 rounded-full mb-4 bg-gradient-to-r from-rose-400 to-orange-300'>
          Resolutions: Unboring them since 2023
        </p>
        <h1 className='text-2xl md:text-6xl font-bold text-secondary mb-8'>
          Resolutions so ridiculous, <br /> they'll have you laughing into 2024.
        </h1>
        <Link href="/create" className='bg-white text-white font-medium py-2 px-4 rounded-md bg-gradient-to-r from-red-500 to-orange-500'>
          Create now
        </Link>
      </div>
    </main>
  )
}
