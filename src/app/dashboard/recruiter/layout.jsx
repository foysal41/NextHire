import { requireRole } from '@/lib/core/session';
import React from 'react'

async function RecruiterLayout({children}) {
    await requireRole('recruiter')
  return  children;
}

export default RecruiterLayout