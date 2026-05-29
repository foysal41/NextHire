"use client";

import Link from "next/link";
import { Button, Card, Chip } from "@heroui/react";

const jobs = Array.from({ length: 6 }, (_, index) => ({
  id: index + 1,
  title: "Frontend Developer",
  description:
    "Showcase your commitment to diversity and inclusion by highlighting initiatives",
  location: "New York, USA",
  type: "Hybrid",
  salary: "€25–€40/hour",
}));

function JobDiscoverySection() {
  return (
    <section className="bg-black px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-white/60">
            <span className="h-1.5 w-1.5 bg-[#5120E2]" />
            Smart Job Discovery
            <span className="h-1.5 w-1.5 bg-[#5120E2]" />
          </div>

          <h2 className="mx-auto max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            The roles you&apos;d never
            <br className="hidden sm:block" />
            find by searching
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="rounded-2xl border border-white/5 bg-[#171717] p-6 shadow-none"
            >
              <h3 className="text-2xl font-semibold text-white">
                {job.title}
              </h3>

              <p className="mt-4 max-w-xs text-sm leading-6 text-white/50">
                {job.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                <Chip
                  size="sm"
                  className="bg-white/10 text-xs text-white"
                  variant="flat"
                >
                  📍 {job.location}
                </Chip>

                <Chip
                  size="sm"
                  className="bg-white/10 text-xs text-white"
                  variant="flat"
                >
                  💼 {job.type}
                </Chip>

                <Chip
                  size="sm"
                  className="bg-white/10 text-xs text-white"
                  variant="flat"
                >
                  € {job.salary}
                </Chip>
              </div>

              <Link
                href="/jobs"
                className="mt-10 inline-flex text-sm font-medium text-white transition hover:text-[#7A5CFF]"
              >
                Apply Now <span className="ml-2">→</span>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            as={Link}
            href="/jobs"
            radius="lg"
            className="bg-white px-6 py-3 text-sm font-semibold text-black"
          >
            View all job open
          </Button>
        </div>
      </div>
    </section>
  );
}

export default JobDiscoverySection;