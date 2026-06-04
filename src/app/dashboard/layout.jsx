import { DashboardSidebar } from '@/components/DashboardSidebar'
import React from 'react'

function DashboardLayout({children}) {
  return (
     <div className="flex min-h-screen">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout