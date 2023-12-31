import { Share } from 'lucide-react'
import React from 'react'

const Card = () => {
    return (
        <div className='w-[60vw] md:w-[320px] rounded-2xl h-[400px] bg-secondary-light relative'>
            <h1 className='text-center text-white'>2024</h1>
            <Share className='absolute bottom-2 right-1' />
        </div>
    )
}

export default Card
