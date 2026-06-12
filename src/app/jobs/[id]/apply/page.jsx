import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session'
import { redirect } from 'next/navigation'
import React from 'react'

async function ApplyPage({params}) {
  const {id} =  await params;

  const user = await getUserSession()

  if(!user){
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`)
  }

  
  if (user.role !== "seeker") {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-center items-center text-white p-6">
      <p className="text-zinc-400 text-lg">
        Only job seekers can apply for positions. Please sign in with a seeker account to proceed.
      </p>
    </div>
  );
}

  const job = await getJobById(id)

  return (
     <main className="min-h-screen bg-white px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">
          Apply for {job?.title}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Fill out the form below to apply for this position.
        </p>

        <form className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="name"
              defaultValue={user?.name || ""}
              className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-[#5120E2]"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              name="email"
              defaultValue={user?.email || ""}
              className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-[#5120E2]"
              placeholder="Enter your email"
              readOnly
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              name="phone"
              className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-[#5120E2]"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Resume URL
            </label>
            <input
              name="resume"
              className="h-12 w-full rounded-xl border border-gray-200 px-4 outline-none focus:border-[#5120E2]"
              placeholder="Paste your resume link"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Cover Letter
            </label>
            <textarea
              name="coverLetter"
              rows={6}
              className="w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-[#5120E2]"
              placeholder="Write a short cover letter..."
            />
          </div>

          <button
            type="submit"
            className="h-12 rounded-xl bg-[#5120E2] px-6 font-semibold text-white"
          >
            Submit Application
          </button>
        </form>
      </div>
    </main>
  )
}

export default ApplyPage