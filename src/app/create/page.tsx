'use client'
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';

interface FormData {
    about: string,
    goal: string

}

const fetcher = url => fetch(url).then(res => res.json());
const Create = () => {
    const { register, handleSubmit, watch } = useForm<FormData>(
        {
            defaultValues: {
                goal: 'realistic'
            }
        }
    );

    const onSubmit = async (data: FormData) => {
        try {
            const response = await axios.post('/api/ai/realistic', { prompt: data.about });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='bg-secondary flex custom-h items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-secondary rounded-lg flex flex-col items-center p-4 md:p-8'>
                <div className='bg-secondary-light py-5 px-4 md:px-8 rounded-lg'>
                    <input
                        {...register("about")}
                        type="text"
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

                <button type="submit" className='w-full md:w-[465px] mt-5 py-2 bg-white text-center text-black rounded-2xl'>
                    Generate
                </button>
            </form>
        </div>
    )
}

export default Create