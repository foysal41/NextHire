import JobCard from '@/components/jobs/JobCard'
import { getJobs } from '@/lib/api/jobs';
import React from 'react'


async function page() {
    const jobs = await getJobs();
  return (
    <div className='group mt-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'>
        <JobCard jobs={jobs}></JobCard>
    </div>
  )
}

export default page