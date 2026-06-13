export default function PricingPage() {
  const seekerPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      features: [
        "Save up to 10 jobs",
        "Apply to 3 jobs/month",
        "Basic profile",
        "Email alerts",
      ],
    },
    {
      name: "Pro",
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
      price: "$0",
      period: "/forever",
      features: [
        "3 active job posts",
        "Applicant management",
        "Standard visibility",
      ],
    },
    {
      name: "Growth",
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

  return (
    <section className="bg-white py-20">
  <div className="mx-auto max-w-7xl px-6">
    <div className="text-center">
      <h1 className="text-5xl font-bold text-gray-900">
        Simple & Transparent Pricing
      </h1>

      <p className="mt-4 text-lg text-gray-500">
        Choose the perfect plan for your hiring or job search journey.
      </p>
    </div>

    {/* Job Seeker Plans */}
    <div className="mt-20">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        For Job Seekers
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Free */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900">Free</h3>

          <div className="mt-4">
            <span className="text-5xl font-bold text-gray-900">$0</span>
            <span className="text-gray-500">/forever</span>
          </div>

          <ul className="mt-8 space-y-3 text-gray-600">
            <li>✓ Save up to 10 jobs</li>
            <li>✓ Apply to 3 jobs/month</li>
            <li>✓ Basic profile</li>
            <li>✓ Email alerts</li>
          </ul>

          <button className="mt-8 w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-800">
            Get Started
          </button>
        </div>

        {/* Pro */}
        <div className="relative rounded-3xl border-2 border-[#5120E2] bg-white p-8 shadow-lg">
          <span className="absolute right-6 top-6 rounded-full bg-[#5120E2] px-3 py-1 text-xs font-semibold text-white">
            Most Popular
          </span>

          <h3 className="text-2xl font-bold text-gray-900">Pro</h3>

          <div className="mt-4">
            <span className="text-5xl font-bold text-gray-900">$19</span>
            <span className="text-gray-500">/month</span>
          </div>

          <ul className="mt-8 space-y-3 text-gray-600">
            <li>✓ Apply to 30 jobs/month</li>
            <li>✓ Unlimited saved jobs</li>
            <li>✓ Application tracking</li>
            <li>✓ Salary insights</li>
          </ul>

          <button className="mt-8 w-full rounded-xl bg-[#5120E2] py-3 font-semibold text-white">
            Upgrade Now
          </button>
        </div>

        {/* Premium */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900">Premium</h3>

          <div className="mt-4">
            <span className="text-5xl font-bold text-gray-900">$39</span>
            <span className="text-gray-500">/month</span>
          </div>

          <ul className="mt-8 space-y-3 text-gray-600">
            <li>✓ Unlimited applications</li>
            <li>✓ Profile boost</li>
            <li>✓ Early job access</li>
            <li>✓ Priority support</li>
          </ul>

          <button className="mt-8 w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-800">
            Choose Premium
          </button>
        </div>
      </div>
    </div>

    {/* Recruiter Plans */}
    <div className="mt-24">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        For Recruiters
      </h2>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900">Free</h3>

          <div className="mt-4">
            <span className="text-5xl font-bold text-gray-900">$0</span>
            <span className="text-gray-500">/forever</span>
          </div>

          <ul className="mt-8 space-y-3 text-gray-600">
            <li>✓ 3 active job posts</li>
            <li>✓ Applicant management</li>
            <li>✓ Standard visibility</li>
          </ul>

          <button className="mt-8 w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-800">
            Get Started
          </button>
        </div>

        <div className="relative rounded-3xl border-2 border-[#5120E2] bg-white p-8 shadow-lg">
          <span className="absolute right-6 top-6 rounded-full bg-[#5120E2] px-3 py-1 text-xs font-semibold text-white">
            Recommended
          </span>

          <h3 className="text-2xl font-bold text-gray-900">Growth</h3>

          <div className="mt-4">
            <span className="text-5xl font-bold text-gray-900">$49</span>
            <span className="text-gray-500">/month</span>
          </div>

          <ul className="mt-8 space-y-3 text-gray-600">
            <li>✓ 10 active job posts</li>
            <li>✓ Applicant tracking</li>
            <li>✓ Basic analytics</li>
            <li>✓ Email support</li>
          </ul>

          <button className="mt-8 w-full rounded-xl bg-[#5120E2] py-3 font-semibold text-white">
            Upgrade Now
          </button>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>

          <div className="mt-4">
            <span className="text-5xl font-bold text-gray-900">$149</span>
            <span className="text-gray-500">/month</span>
          </div>

          <ul className="mt-8 space-y-3 text-gray-600">
            <li>✓ 50 active job posts</li>
            <li>✓ Advanced analytics</li>
            <li>✓ Featured listings</li>
            <li>✓ Priority support</li>
          </ul>

          <button className="mt-8 w-full rounded-xl border border-gray-300 py-3 font-semibold text-gray-800">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}