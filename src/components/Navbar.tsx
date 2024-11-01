import { UserButton, auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const { userId } = auth()
    return (
      <div className="bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-between px-5 py-5 h-[5vh]">
        <div>
          <Link href="/">
            <h1 className="font-semibold text-white">NYN</h1>
          </Link>
        </div>
        <nav className="flex gap-5 items-center ">
          {userId ? (
            <>
              <Link className="text-white" href="/create">
                Create
              </Link>
              <Link className="text-white mr-10" href="/resolutions">
                Resolutions
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <Link
              className="bg-white w-[185] h-[60] rounded-lg px-2 py-1"
              href="/create"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    );
}

export default Navbar