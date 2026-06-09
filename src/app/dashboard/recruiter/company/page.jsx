import React from 'react'
import { headers } from "next/headers";
import RecruiterCompany from './RecruiterCompany'
import { getUserSession } from '@/lib/core/session'

export async function CompanyPage() {
    const user = await getUserSession();
    console.log("User Session in company page", user)

  return (

    <div>
        <RecruiterCompany recruiter = {user}></RecruiterCompany>
    </div>
  )
}

export default CompanyPage