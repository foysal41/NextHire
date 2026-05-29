"use client";

import Image from "next/image";
import { Button, Chip, Input, Card } from "@heroui/react";
import { Icon } from "@gravity-ui/uikit";
import {
  Magnifier,
  MapPin,
  Briefcase,
  PersonMagnifier,
  Star,
} from "@gravity-ui/icons";

import GlobeImage from "@/assets/globe.png";

const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Briefcase, value: "12K", label: "Companies" },
  { icon: PersonMagnifier, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(81,32,226,0.35),transparent_45%)]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pt-14 text-center sm:px-6 sm:pt-16 lg:pt-20">
        <Chip
          variant="flat"
          className="border border-white/10 bg-white/5 px-3 py-4 text-[10px] text-white backdrop-blur-md sm:text-xs"
        >
          💼 50,000+ NEW JOBS THIS MONTH
        </Chip>

        <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
          NextHire connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <div className="mt-8 flex w-full md:w-fit    max-w-3xl flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl md:flex-row md:items-center">
          <Input
            placeholder="Job title, skill or company"
            variant="bordered"
            startContent={<Icon data={Magnifier} size={18} />}
            classNames={{
              base: "w-full",
              inputWrapper: "border-0 bg-transparent shadow-none",
              input: "text-white placeholder:text-white/40",
            }}
          />

          <div className="hidden h-8 w-px bg-white/10 md:block" />

          <Input
            placeholder="Location or Remote"
            variant="bordered"
            startContent={<Icon data={MapPin} size={18} />}
            classNames={{
              base: "w-full",
              inputWrapper: "border-0 bg-transparent shadow-none",
              input: "text-white placeholder:text-white/40",
            }}
          />

          <Button
            radius="lg"
            className="!bg-[#5120E2] w-full mx-auto !text-white hover:!bg-[#4219bd] md:min-w-12"
          >
            <Icon data={Magnifier} size={18} />
            <span className="md:hidden">Search</span>
          </Button>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-white/45">
          <span className="w-full sm:w-auto">Trending Position</span>

          {["Product Designer", "AI Engineering", "DevOps Engineer"].map(
            (item) => (
              <Chip
                key={item}
                size="sm"
                variant="flat"
                className="bg-white/10 text-white"
              >
                {item}
              </Chip>
            )
          )}
        </div>
      </div>

      <div className="relative z-0 mx-auto mt-10 max-w-7xl px-0 sm:mt-12 lg:-mt-2">
        <Image
          src={GlobeImage}
          alt="Globe"
          priority
          className="mx-auto w-full md:w-[135%] max-w-none object-contain sm:w-full lg:max-w-6xl"
        />

        <div className="absolute left-1/2 top-[48%] z-10 w-full -translate-x-1/2 px-6 text-center sm:top-[50%] lg:top-[48%]">
          <h2 className="mx-auto max-w-3xl text-xl font-semibold leading-relaxed text-white sm:text-3xl lg:text-5xl">
            Assisting over 15,000 job seekers
            <br className="hidden sm:block" />
            find their dream positions.
          </h2>
        </div>
      </div>

      <div className="relative z-20 mt-0 md:-mt-[300px] mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 pb-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:pb-16">
        {stats.map((item) => (
          <Card
            key={item.label}
            className="border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6"
          >
            <Icon data={item.icon} size={18} className="text-white/80" />

            <h3 className="mt-8 text-4xl font-bold text-white sm:text-5xl">
              {item.value}
            </h3>

            <p className="mt-3 text-sm text-white/65">{item.label}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default HeroSection;