'use client'
import DashboardStats from '@/components/dashboard/DashboardStats';
import { useSession } from '@/lib/auth-client'
import { CircleCheck, File, Persons, Thunderbolt } from '@gravity-ui/icons';

import React from 'react'

function RecruiterDashboardHomePage() {


  const {data:session, isPending} = useSession();

  if(isPending){
    return <div>loading...</div>
  }


  const recruiterStats = [
  {
    icon: File,
    title: "Total Job Posts",
    value: "48",
  },
  {
    icon: Persons,
    title: "Applicants",
    value: "1,284",
  },
  {
    icon: Thunderbolt,
    title: "Active Jobs",
    value: "18",
  },
  {
    icon: CircleCheck,
    title: "Jobs Closed",
    value: "32",
  },
];
  
  const user = session?.user;
  console.log("session data", user)






  return (
    <div>
      
      <h2 className='text-4xl font-bold'>Welcome back, {user?.name}</h2>
      <DashboardStats stats={recruiterStats}></DashboardStats>
    </div>
  )
}

export default RecruiterDashboardHomePage