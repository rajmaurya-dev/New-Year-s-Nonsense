'use client'
import { useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { ArrowBigRightDash, ArrowRightCircle, Delete, DoorOpen, LoaderIcon, Share, Trash } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

const MyResolutions = () => {
    const { userId, } = useAuth();
    const [loading, setLoading] = useState(false)
    const [resolutions, setResolutions] = useState<{ id: string; content: string; userId: string; createdAt: Date; updatedAt: Date; }[]>([]);

    const fetchResolutions = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/my');
            setResolutions(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching resolutions:', error);
        }
        setLoading(false);
    };
    useEffect(() => {

        fetchResolutions();
    }, [userId]);
    const copyToClipboard = async (id: string) => {

        try {
            await navigator.clipboard.writeText(`https://nyn.rajcrafts.tech/resolutions/${id}`);

            toast.success('Link Copied to clipboard!');
        } catch (err: any) {
            toast.error('Failed to copy Link: ', err);
            console.error('Failed to copy Link: ', err);
        }
    };

    if (loading) {
        return <div className='custom-h w-screen grid place-content-center'>
            <LoaderIcon size={48} className=' text-blue-700 animate-spin' />
        </div>;
    }
    const handleDelete = async (id: any) => {
        try {
            const resolution = await axios.delete('/api/create', {
                data: {
                    id: id,
                    userId: userId,
                },
            });
            setResolutions(prevResolutions => prevResolutions.filter(resolution => resolution.id !== id));
            toast.success('Resolution deleted successfully');
        } catch (error: any) {
            console.error('Error deleting resolution:', error);
            toast.error('Error deleting resolution', error);
        }
    };

    return (
        <div className={`gap-5 py-2 px-2  masonry`} >
            {resolutions.map((resolution) => (
                <div key={resolution.id} className=' item bg-gradient-to-r from-red-500 to-orange-500  shadow-md shadow-gray-900 rounded-lg p-4 text-white backdrop-filter backdrop-blur-sm bg-opacity-10  h-fit '>
                    <div className=''>
                        <Markdown>{resolution.content}</Markdown>
                    </div>
                    <div className='flex justify-end'>

                        <Link href={`/resolutions/${resolution.id}`}>
                            <DoorOpen className='text-blue-600' />
                        </Link>


                        <button className='' onClick={() => copyToClipboard(resolution.id)}>
                            <Share className='text-green-500' />
                        </button>
                        <button className='' onClick={() => handleDelete(resolution.id)}>
                            <Trash className='text-red-500 hover:text-red-700' />
                        </button>

                    </div>

                </div>
            ))}
        </div>
    )
}

export default MyResolutions