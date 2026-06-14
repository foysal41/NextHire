"use client";

import { useState } from "react";

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("seeker");

  const seekerPlans = [
    {
      name: "Free",
      id: "seeker_free",
      price: "$0",
      period: "/forever",
      free: true,
      features: [
        "Save up to 10 jobs",
        "Apply to 3 jobs/month",
        "Basic profile",
        "Email alerts",
      ],
    },
    {
      name: "Pro",
      id: "seeker_pro",
      price: "$19",
      period: "/month",
      popular: true,
      features: [
        "Apply to 30 jobs/month",
        "Unlimited saved jobs",
        "Application tracking",
        "Salary insights",
      ],
    },
    {
      name: "Premium",
      id: "seeker_premium",
      price: "$39",
      period: "/month",
      features: [
        "Unlimited applications",
        "Profile boost",
        "Early job access",
        "Priority support",
      ],
    },
  ];

  const recruiterPlans = [
    {
      name: "Free",
      id: "recruiter_free",
      price: "$0",
      period: "/forever",
      free: true,
      features: [
        "3 active job posts",
        "Applicant management",
        "Standard visibility",
      ],
    },
    {
      name: "Growth",
      id: "recruiter_growth",
      price: "$49",
      period: "/month",
      popular: true,
      features: [
        "10 active job posts",
        "Applicant tracking",
        "Basic analytics",
        "Email support",
      ],
    },
    {
      name: "Enterprise",
      id: "recruiter_enterprise",
      price: "$149",
      period: "/month",
      features: [
        "50 active job posts",
        "Advanced analytics",
        "Featured listings",
        "Priority support",
      ],
    },
  ];

  const plans = activeTab === "seeker" ? seekerPlans : recruiterPlans;

  return (
    <section className="min-h-screen bg-white px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#5120E2]">
            Pricing
          </p>

          <h1 className="mt-3 text-4xl font-bold text-gray-950 md:text-5xl">
            Simple & Transparent Pricing
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Choose the perfect plan for your hiring or job search journey.
          </p>
        </div>

        {/* Toggle */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full border border-gray-200 bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("seeker")}
              className={`rounded-full px-6 py-2 text-sm font-semibold ${
                activeTab === "seeker"
                  ? "bg-[#5120E2] text-white"
                  : "text-gray-600"
              }`}
            >
              Job Seekers
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("recruiter")}
              className={`rounded-full px-6 py-2 text-sm font-semibold ${
                activeTab === "recruiter"
                  ? "bg-[#5120E2] text-white"
                  : "text-gray-600"
              }`}
            >
              Recruiters
            </button>
          </div>
        </div>

        {/* Dynamic Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-3xl bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl ${
                plan.popular
                  ? "border-2 border-[#5120E2] shadow-lg"
                  : "border border-gray-200 shadow-sm"
              }`}
            >
              {plan.popular && (
                <span className="absolute right-6 top-6 rounded-full bg-[#5120E2] px-3 py-1 text-xs font-semibold text-white">
                  Popular
                </span>
              )}

              <h3 className="text-2xl font-bold text-gray-950">{plan.name}</h3>

              <div className="mt-5">
                <span className="text-5xl font-bold text-gray-950">
                  {plan.price}
                </span>
                <span className="text-gray-500">{plan.period}</span>
              </div>

              <ul className="mt-8 flex-1 space-y-4 text-gray-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="font-bold text-[#5120E2]">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.free ? (
                <button
                  type="button"
                  className="mt-8 w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-800 transition hover:bg-gray-50"
                >
                  Get Started
                </button>
              ) : (
                <form action="/api/checkout_sessions" method="POST">
                  {/* Backend এই plan_id দিয়ে Stripe price detect করবে */}
                  <input type="hidden" name="plan_id" value={plan.id} />

                  <button
                    type="submit"
                    role="link"
                    className={`mt-8 w-full rounded-xl py-3 font-semibold transition ${
                      plan.popular
                        ? "bg-[#5120E2] text-white hover:bg-[#4019b5]"
                        : "border border-gray-300 text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    Checkout
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
