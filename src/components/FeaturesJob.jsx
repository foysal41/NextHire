"use client";

import { Card } from "@heroui/react";

const features = [
  {
    icon: "⌕",
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: "↗",
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: "▥",
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: "▯",
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: "✣",
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: "▤",
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: "⬡",
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: "↗",
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
];


function FeaturesJob() {
  return (
    <section className="bg-[#171717] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.18em] text-white/60">
            <span className="h-1.5 w-1.5 bg-[#5120E2]" />
            Features Job
            <span className="h-1.5 w-1.5 bg-[#5120E2]" />
          </div>

          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Everything you need
            <br />
            to succeed
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item) => (
            <div key={item.title} className="flex gap-4">
              <Card className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-2xl text-[#F0B6FF] shadow-none">
                {item.icon}
              </Card>

              <div>
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-white/50">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesJob