import Link from "next/link";
import Image from "next/image";
import {LogoFacebook} from '@gravity-ui/icons';
import {LogoLinkedin} from '@gravity-ui/icons';
import HireLoopLogo from "@/assets/next-hire-white-logo.png";
import { label, title } from "framer-motion/client";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/worker-ai" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "/salary" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Career library", href: "/career-library" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/brand-guideline" },
      { label: "Newsroom", href: "/newsroom" },
    ],
  },
];
function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src={HireLoopLogo}
                alt="Hire Loop Logo"
                width={170}
                height={60}
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-gray-400">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-medium text-[#6556FF]">
                {column.title}
              </h3>

              <ul className="mt-6 space-y-4">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-[#5120E2]"
              aria-label="Facebook"
            >
              <LogoFacebook size={18} />
            </Link>

          

            <Link
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-[#5120E2]"
              aria-label="LinkedIn"
            >
              <LogoLinkedin size={18} />
            </Link>
          </div>

          <div className="flex flex-col gap-3 text-sm text-gray-400 md:flex-row md:items-center md:gap-8">
            <p>Copyright 2026 — Foysal Jaman</p>

            <div className="flex gap-1">
              <Link href="/terms" className="hover:text-white">
                Terms & Policy
              </Link>
              <span>-</span>
              <Link href="/privacy" className="hover:text-white">
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
