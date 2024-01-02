'use client'
import Card from '@/components/Card'
import { db } from '@/lib/db';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { ArrowBigRightDash, ArrowRightCircle, DoorOpen, Share } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

const MyResolutions = () => {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [resolutions, setResolutions] = useState<{ id: string; content: string; userId: string; createdAt: Date; updatedAt: Date; }[]>([]);

    useEffect(() => {
        const fetchResolutions = async () => {
            try {
                const response = await axios.get('/api/my');
                setResolutions(response.data);
            } catch (error) {
                console.error('Error fetching resolutions:', error);
            }
        };

        fetchResolutions();
    }, [userId]);
    const copyToClipboard = async (id: string) => {

        try {
            await navigator.clipboard.writeText(`https://nyn.rajcrafts.tech/resolutions/${id}`);
            toast.success('Copied to clipboard!');
        } catch (err: any) {
            toast.error('Failed to copy text: ', err);
            console.error('Failed to copy text: ', err);
        }
    };


    return (
        <div className={`gap-5 py-2 px-2  masonry`} >
            {resolutions.map((resolution) => (
                <div key={resolution.id} className=' item bg-white rounded-md  backdrop-filter backdrop-blur-sm h-fit border border-gray-100 p-4'>
                    <div className=''>
                        <Markdown>{resolution.content}</Markdown>
                    </div>
                    <div className='flex justify-end'>

                        <Link href={`/resolutions/${resolution.id}`}>
                            <DoorOpen className='text-primary' />
                        </Link>


                        <button className='' onClick={() => copyToClipboard(resolution.id)}>
                            <Share className='text-primary' />
                        </button>

                    </div>

                </div>
            ))}
        </div>
    )
}

export default MyResolutions