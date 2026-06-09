import React from 'react'
import { headers } from "next/headers";
import RecruiterCompany from './RecruiterCompany'
import { getUserSession } from '@/lib/core/session'
import { getRecruiterCompany } from '@/lib/api/recruiterCompany';

export async function CompanyPage() {
    const user = await getUserSession();
    console.log("User Session in company page", user)

    const company = await getRecruiterCompany(user.id)
  

  return (

    <div>
        <RecruiterCompany recruiter = {user} recruiterCompany={company}></RecruiterCompany>
    </div>
  )
}

export default CompanyPage