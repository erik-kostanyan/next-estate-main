'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Header() {

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link href='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Live</span>
            <span className='text-slate-700'>IMMO</span>
          </h1>
        </Link>
        <ul className='flex gap-5'>
          <Link href='/'>
            <li className='hidden md:inline text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          <Link href='/search'>
            <li className='hidden md:inline text-slate-700 hover:underline'>
              Listings
            </li>
          </Link>
          <Link href='/create-listing'>
            <li className='hidden md:inline text-slate-700 hover:underline'>
              Create
            </li>
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link href='/sign-in'>
              <li className='hidden md:inline text-slate-700 hover:underline'>
                Sign In
              </li>
            </Link>
          </SignedOut>
        </ul>
      </div>
    </header>
  );
}
