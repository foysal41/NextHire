"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import HireLoopLogo from "@/assets/next-hire-logo.png";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Plans", href: "/plans" },
];




function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //1) Session check করেছি
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  //2) Logout function add করেছি
  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/auth/signin";
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={HireLoopLogo}
              alt="NextHire Logo"
              width={170}
              height={60}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm md:flex">
          {navLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 3) এখন condition দিয়েছি: session থাকলে  mobile user info + logout same in mobile  */}
        <div className="hidden items-center gap-5 md:flex">
          {isPending ? null : user ? (
            <>
              <div className="flex items-center gap-3">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User"}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5120E2] text-sm font-bold text-white">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}

                <div className="leading-tight">
                  <p className="text-sm font-semibold text-black">
                    {user.name || "User"}
                  </p>
                  <p className="max-w-[140px] truncate text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="rounded-full border border-red-500 px-5 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="text-sm font-semibold text-black transition hover:text-[#5120E2]"
              >
                Sign In
              </Link>

              <Link
                href="/auth/signup"
                className="rounded-full bg-[#5120E2] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4219bd]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {isPending ? null : user ? (
              <>
                <li className="pt-3">
                  <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={44}
                        height={44}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5120E2] text-sm font-bold text-white">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}

                    <div>
                      <p className="text-sm font-semibold text-black">
                        {user.name || "User"}
                      </p>
                      <p className="max-w-[220px] truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </li>

                <li>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="block w-full rounded-full border border-red-500 px-6 py-3 text-center text-sm font-semibold text-red-500 transition hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="pt-2">
                  <Link
                    href="/auth/signin"
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>

                <li>
                  <Link
                    href="/auth/signup"
                    className="block w-full rounded-full bg-[#5120E2] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#4219bd]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;