import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 shadow-xl">

        {/* Icon */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
          <span className="text-5xl">🚫</span>
        </div>

        {/* Content */}
        <div className="mt-8 text-center">
          <div className="inline-flex rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">
            Unauthorized Access
          </div>

          <h1 className="mt-5 text-4xl font-bold text-gray-900">
            Access Denied
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            You do not have permission to access this page.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Please sign in with the correct account or contact support if
            you believe this is a mistake.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Go Home
          </Link>

          <Link
            href="/auth/signin"
            className="rounded-xl bg-[#5120E2] px-6 py-3 font-semibold text-white transition hover:bg-[#4218bd]"
          >
            Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}