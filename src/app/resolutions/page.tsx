import Card from '@/components/Card'
import React from 'react'

const MyResolutions = () => {
    return (
        <div className='bg-secondary flex custom-h items-center justify-center'>
            <div className='flex flex-col md:flex-row gap-2 py-2'>
                <Card />
                <Card />
            </div>
        </div>
    )
}

export default MyResolutions