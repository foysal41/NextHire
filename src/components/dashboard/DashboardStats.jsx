import React from 'react'
import StateCard from './StateCard'

function DashboardStats({stats}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <StateCard
          key={item.title}
          icon={item.icon}
          title={item.title}
          value={item.value}
          change={item.change}
          changeType={item.changeType}
        />
      ))}
    </div>
  )
}

export default DashboardStats