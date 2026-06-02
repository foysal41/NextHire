import { DashboardSidebar } from '@/components/DashboardSidebar'
import React from 'react'

function DashboardLayout({children}) {
  return (
    <div>
        <DashboardSidebar></DashboardSidebar>
        <div>{children}</div>
    </div>
  )
}

export default DashboardLayout