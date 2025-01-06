'use client'
import React from 'react'
import Image from "next/image";
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Hero = () => {

  const {user, isSignedIn, isLoaded} = useUser();
  const router = useRouter();
  const onClickChange = () => {
    if(isSignedIn){
      router.replace('/dashboard');
    }
    else {
      router.replace('/dashboard/sign-in');
    }
  }
  return (
    <div>
        <section className="bg-gray-50 flex items-center flex-col">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-extrabold sm:text-5xl">
        Manager Your Expense
        <strong className="font-extrabold text-primary sm:block"> Control your Money </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed">
        Start Creating your budget and save ton of money
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <a
         onClick={onClickChange}
          className="block w-full rounded bg-primary px-12 py-3 text-sm bg-blue-700 font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-700 sm:w-auto">
           {isSignedIn ? 'Go to Dashboard' : 'Get Started Now'}
        </a>
      </div>
    </div>
  </div>
  <div>
    <Image className='mt-2 rounded-xl border-2' src={"/dashboard.png"} alt="image placeholder" width={1000} height={700} />
  </div>
</section>
</div>
  )
}

export default Hero