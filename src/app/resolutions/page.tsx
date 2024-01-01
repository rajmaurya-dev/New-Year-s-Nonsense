'use client'
import Card from '@/components/Card'
import { db } from '@/lib/db';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
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
    return (
        <div className='flex flex-col md:flex-row gap-2 py-2 px-2'>
            {resolutions.map((resolution) => (
                <Link href={`/resolutions/${resolution.id}`} key={resolution.id} className='bg-primary shadow-md rounded-lg p-4 md:w-1/2 lg:w-1/3 xl:w-1/4'>

                    <div className='prose max-w-none'>
                        <Markdown>{resolution.content}</Markdown>
                    </div>

                </Link>
            ))}
        </div>
    )
}

export default MyResolutions