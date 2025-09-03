'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
const MenuOption=[
    {
        name: 'Dashboard',
        path: '/dashboard'
    },
    {
        name: 'Upgrade',
        path: '/upgrade'
    },
    {
        name: 'How it works',
        path: '/tutorial'
    }
]

function Header() {
  const router = useRouter();
  const onStart=(path)=>{
    router.push(path)
  }
  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
      <div>
        <Link className='flex items-center cursor-pointer' href={'/'}>
          <Image src={'/logo.png'} alt='logo' width={50} height={50}/>
          <h1 className="text-base font-bold md:text-2xl">Interview Genie</h1>
        </Link>
      </div>
      <div className='hidden md:flex'>
        <ul className='flex gap-5'>
            {MenuOption.map((option, index)=>(
                <li onClick={()=>{onStart(option.path)}} className='text-xl hover:scale-105 transition-all cursor-pointer' key={index}>{option.name}</li>
            ))}
        </ul>
      </div>
      <div className="w-12 h-12 flex items-center justify-center">
        <UserButton />
      </div>
    </nav>
  )
}

export default Header