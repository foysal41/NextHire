import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Invalid payment session.");
  }

  const {
    status,
    customer_details: { email: customerEmail },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    redirect("/pricing");
  }

  if (status === "complete") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-gray-50 to-purple-50 px-4 py-16">
        <div className="w-full max-w-2xl rounded-[32px] border border-gray-100 bg-white p-8 text-center shadow-2xl md:p-12">
          

          <h1 className="mt-8 text-4xl font-bold text-gray-950">
            Payment Successful!
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Thank you for upgrading your NextHire plan.
          </p>

          <div className="mt-5 inline-flex rounded-full bg-[#5120E2]/10 px-4 py-2 text-sm font-semibold text-[#5120E2]">
            Active Subscription
          </div>

          <p className="mt-6 text-sm text-gray-500">
            A confirmation email has been sent to
          </p>

          <p className="mt-1 text-lg font-semibold text-[#5120E2]">
            {customerEmail}
          </p>

          <div className="mt-8 rounded-2xl bg-green-50 p-5">
            <p className="text-sm leading-6 text-green-700">
              Your subscription is now active. You can start enjoying premium
              features immediately.
            </p>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
            >
              Go Home
            </Link>

            
          </div>
        </div>
      </main>
    );
  }

  return null;
}