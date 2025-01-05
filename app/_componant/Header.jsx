import React from 'react'
import Image from "next/image"
import { ClerkProvider, SignedIn, SignedOut, SignIn, SignInButton, UserButton } from '@clerk/nextjs'

const Header = () => {
  return (
    <ClerkProvider>
      <div className='p-5 flex justify-between items-center border shadow-sm'>
        <Image src={"./logo.svg"}
          alt="logo"
          width={160}
          height={100} />
        <div >
          <SignedOut>
            <SignInButton className=" rounded bg-primary px-6 py-2 text-sm font-large text-white shadow hover:bg-blue-800 focus:outline-none focus:ring active:bg-blue-700 sm:w-auto " />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </ClerkProvider>
  )
}

export default Header