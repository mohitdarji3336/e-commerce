'use client';

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

export default function AuthButtons() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    return (
      <div className="flex items-center space-x-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <SignInButton mode="modal">
        <button className="px-4 py-2 text-white hover:text-gray-200 transition-colors duration-200">
          Sign In
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="px-4 py-2 bg-white text-slate-900 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          Sign Up
        </button>
      </SignUpButton>
    </div>
  );
} 