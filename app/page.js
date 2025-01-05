import Image from "next/image";
import Header from "./_componant/Header";
import Hero from "./_componant/Hero";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
export default function Home() {
  return (
    <ClerkProvider>
      <div>
        <Header />
        <Hero />
      </div>
    </ClerkProvider>
  );
}
