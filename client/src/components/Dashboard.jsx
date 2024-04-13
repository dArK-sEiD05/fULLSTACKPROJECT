import React from 'react'
import DBLeftSection from './DBLeftSection'
import DBRightSection from './DBRightSection'

const Dashboard = () => {
  return (
    <div className="flex items-center justify-start w-screen bg-primary h-screen">
        
        <DBLeftSection/>
        <DBRightSection/>
    </div>
  )
}

export default Dashboard