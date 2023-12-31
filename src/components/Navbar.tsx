import { UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const { userId } = auth()
    return (
        <div className='bg-primary flex items-center justify-between px-5 py-5 h-[50px]'>
            <div>
                <Link href="/">
                    <h1 className='font-semibold text-secondary'>NYN</h1>
                </Link>
            </div>
            <nav className='flex gap-2'>
                {
                    userId ? (
                        <>
                            <Link className='bg-white w-[185] h-[60] rounded-lg px-2 py-1' href="/create">Create</Link>
                            <Link className='bg-white w-[185] h-[60] rounded-lg px-2 py-1' href="/resolutions">Resolutions</Link>
                            <UserButton afterSignOutUrl="/" />
                        </>
                    ) : (
                        <Link className='bg-white w-[185] h-[60] rounded-lg px-2 py-1' href="/create">Sign in</Link>
                    )
                }
            </nav>
        </div>
    )
}

export default Navbar