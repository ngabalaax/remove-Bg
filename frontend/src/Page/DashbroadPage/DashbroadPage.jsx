import Dashbroad from '@/components/Dashbroad/Dashbroad'
import React from 'react'

const DashbroadPage = () => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-grow">
                <Dashbroad />
            </div>
        </div>
    )
}

export default DashbroadPage