'use client'
import { db } from '@/lib/db';
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { Share } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

const Resolution = ({ params }: any) => {
    console.log(params)
    const { userId, } = useAuth();



    const [resolution, setResolution] = useState<{ id: string; content: string; userId: string; createdAt: Date; updatedAt: Date; } | null>(null);

    useEffect(() => {
        const fetchResolution = async () => {
            try {
                const response = await axios.get(`/api/resolution/${params.id}  `);
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

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(`https://nyn.rajcrafts.tech/resolutions/${params.id}`);
            toast.success('Copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className='custom-h grid place-content-center text-start'>
            <div className='bg-white shadow-md rounded-lg p-4 text-primary'>
                <Markdown>{resolution.content}</Markdown>
            </div>
            <button className='mt-4 bg-white text-primary font-bold py-2 px-4 rounded flex gap-5 justify-center hover:bg-green-600' onClick={copyToClipboard}>
                <Share /> <span className='font-thin'>Share with friends and family</span>
            </button>
        </div>

    )
}

export default Resolution;
