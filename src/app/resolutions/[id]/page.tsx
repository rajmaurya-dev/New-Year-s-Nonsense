'use client'
import { db } from '@/lib/db';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown';

const Resolution = ({ params }: any) => {
    console.log(params)
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const router = useRouter();
    // Extract the ID from the URL

    const [resolution, setResolution] = useState<{ id: string; content: string; userId: string; createdAt: Date; updatedAt: Date; } | null>(null);

    useEffect(() => {
        const fetchResolution = async () => {
            try {
                const response = await axios.get(`/api/resolution/byId`);
                setResolution(response.data);
            } catch (error) {
                console.error('Error fetching resolution:', error);
            }
        };

        if (params.id) {
            fetchResolution();
        }
    }, [params.id, userId]);

    if (!resolution) {
        return <div>Loading...</div>;
    }

    console.log(resolution)
    return (
        <div className='bg-primary shadow-md rounded-lg p-4'>
            <div className='prose max-w-none'>
                <Markdown>{resolution.content}</Markdown>
            </div>
        </div>
    )
}

export default Resolution;
