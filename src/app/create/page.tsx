import React from 'react'

const Create = () => {
    return (
        <div className='bg-secondary flex custom-h items-center justify-center'>
            <form className='bg-secondary rounded-lg flex flex-col items-center p-4 md:p-8'>
                <div className='bg-secondary-light py-5 px-4 md:px-8 rounded-lg'>
                    <input
                        type="text"
                        className='w-full md:w-[590px] h-24 md:h-[171px] rounded-lg text-center'
                        placeholder="Tell us about yourself or what you want to improve in this year?"
                    />
                    <p className='text-center text-white font-normal py-2'>Set Your Goal:</p>
                    <div className="flex flex-col md:flex-row justify-center md:space-x-4">
                        <input
                            type="radio"
                            id="realistic"
                            name="options"
                            value="realistic"
                            className="hidden"
                        />
                        <label
                            htmlFor="realistic"
                            className="cursor-pointer px-4 py-2 mb-2 md:mb-0 bg-white text-black rounded-md"
                        >
                            Realistic
                        </label>

                        <input
                            type="radio"
                            id="unrealistic"
                            name="options"
                            value="unrealistic"
                            className="hidden"
                        />
                        <label
                            htmlFor="unrealistic"
                            className="cursor-pointer px-4 py-2 bg-white text-black rounded-md"
                        >
                            Unrealistic
                        </label>
                    </div>
                </div>

                <button className='w-full md:w-[465px] mt-5 py-2 bg-white text-center text-black rounded-2xl'>
                    Generate
                </button>
            </form>
        </div>
    )
}

export default Create