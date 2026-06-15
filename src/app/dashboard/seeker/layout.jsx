import { requireRole } from '@/lib/core/session';
import React from 'react'

async function SeekerLayout({children}) {
    await requireRole('seeker')
  return children;
}

export default SeekerLayout