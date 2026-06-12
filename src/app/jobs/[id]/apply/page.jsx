import { getUserSession } from '@/lib/core/session'
import { redirect } from 'next/navigation'
import React from 'react'

async function ApplyPage({params}) {
  const {id} = await params;

  const user = await getUserSession()
  if(!user){
    redirect(`/auth/signin?redirect=/jobs/${id}/apply`)
  }
  return (
    <div>page</div>
  )
}

export default ApplyPage