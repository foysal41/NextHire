import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session'
import { redirect } from 'next/navigation'
import React from 'react'
import JobApply from './JobApply';
import { div } from 'framer-motion/client';
import { getApplicationByApplicant } from '@/lib/api/application';

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

   const applications = await getApplicationByApplicant(user.id)
   const plan = {
    name: 'Free',
    maxApplicationsPerMonth : 3
   }

  const job = await getJobById(id)

   

  return (
 <div>
  <h2 className="mb-4 text-lg font-semibold">
    You have applied so far: {applications.length} out of{" "}
    {plan.maxApplicationsPerMonth} this month
  </h2>

  {applications.length >= plan.maxApplicationsPerMonth ? (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
      <h3 className="text-xl font-bold text-amber-700">
        Application Limit Reached 
      </h3>

      <p className="mt-2 text-gray-600">
        You have used all {plan.maxApplicationsPerMonth} applications available
        in your {plan.name} plan this month.
      </p>

      <p className="mt-2 text-gray-600">
        Upgrade your plan to apply for more jobs and unlock additional features.
      </p>

      <button className="mt-4 rounded-lg bg-[#5120E2] px-5 py-2 font-semibold text-white hover:bg-[#4019b5]">
        Purchase Premium Plan
      </button>
    </div>
  ) : (
    <JobApply job={job} user={user} />
  )}
</div>
  )
}

export default ApplyPage