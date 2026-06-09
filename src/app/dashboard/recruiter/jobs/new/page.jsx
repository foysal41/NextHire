import React from 'react'
import PostJobForm from './PostJobForm'
import { getLoggedInRecruiterCompany } from '@/lib/api/recruiterCompany'

async function PostJobPage() {

    // server er kaj ta /lib/api/recruiterCompany kore await kore post job form er moddhe diya dilam. 
    const company = await getLoggedInRecruiterCompany();
  return (
    <div><PostJobForm company={company}></PostJobForm></div>
  )
}

export default PostJobPage