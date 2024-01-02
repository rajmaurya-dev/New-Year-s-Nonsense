'use client'
import Markdown from 'react-markdown'
import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

import { useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';

import { LoaderIcon, Wand } from 'lucide-react';
interface FormData {
    about: string,
    goal: string

}

const Create = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [aiData, setAiData] = useState<string | null>(null);
    const { userId, } = useAuth();
    const { register, handleSubmit, watch } = useForm<FormData>(
        {
            defaultValues: {
                goal: 'realistic'
            }
        }
    );


    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/ai/realistic', { prompt: data.about });
            toast.success('Resolution generated successfully');
            setAiData(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error('Error generating resolution');
            console.error(error);
        }
    };
    const handleCreate = async () => {
        try {

            const resolution = await axios.post('/api/create', {
                content: aiData,
                userId: userId,
            });

            toast.success('Resolution created successfully');
            setAiData(null);
        } catch (error: any) {
            setAiData(null);
            console.error('Error creating resolution:', error);
            toast.error('Error creating resolution', error);
        }
    };

    return (
        <div className='bg-secondary flex flex-col custom-h items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-secondary rounded-lg flex flex-col items-center p-4 md:p-8'>
                <div className='bg-secondary-light py-5 px-4 md:px-8 rounded-lg'>
                    <textarea
                        {...register("about")}
                        className='w-full md:w-[590px] h-24 md:h-[171px] rounded-lg text-center'
                        placeholder="Tell us about yourself or what you want to improve in this year?"
                    />
                    <p className='text-center text-white font-normal py-2'>Set Your Goal:</p>
                    <div className="flex flex-col md:flex-row justify-center md:space-x-4">
                        <input
                            {...register("goal")}
                            type="radio"
                            id="realistic"
                            name="goal"
                            value="realistic"
                            className="hidden"
                        />
                        <label
                            htmlFor="realistic"
                            className={`cursor-pointer px-4 py-2 mb-2 md:mb-0 rounded-md ${watch('goal') === 'realistic' ? 'bg-green-600 text-white' : 'bg-white text-black'}`}
                        >
                            Realistic
                        </label>

                        <input
                            {...register("goal")}
                            type="radio"
                            id="unrealistic"
                            name="goal"
                            value="unrealistic"
                            className="hidden"
                        />
                        <label
                            htmlFor="unrealistic"
                            className={`cursor-pointer px-4 py-2 rounded-md ${watch('goal') === 'unrealistic' ? 'bg-red-600 text-white' : 'bg-white text-black'}`}
                        >
                            Unrealistic
                        </label>
                    </div>
                </div>

                <button type="submit" className='w-full md:w-[465px] mt-5 py-2 bg-white text-center text-black rounded-2xl flex justify-center'>
                    {loading ? <LoaderIcon /> : <Wand className='text-primary' />}
                </button>

            </form>

            {aiData && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50 ">
                    <div className="bg-primary p-4 sm:p-8 rounded-10 w-full sm:w-[90vw] lg:w-[80vw] xl:w-[60vw] 2xl:w-[50vw] mx-2 md:mx-0 rounded-md">
                        <Markdown>{aiData}</Markdown>
                        <div className="flex mt-4">
                            <button onClick={handleCreate} className="mr-2 bg-blue-500 text-white px-4 py-2 rounded">Create</button>
                            <button onClick={() => setAiData(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}

export default Create