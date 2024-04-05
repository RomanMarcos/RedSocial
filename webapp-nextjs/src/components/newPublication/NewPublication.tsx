'use client'
import React, { useState, useContext, useRef } from 'react'
import { UsernameContext } from '@/app/(privateContent)/dashboard/page';

import { createPublication } from '@/services/apiCall';

interface NewPublicationsProps {
    handleNewPublications: React.ChangeEventHandler<HTMLInputElement>
}

export const NewPublication: React.FC<NewPublicationsProps> = ({ handleNewPublications }) => {

    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
    const [showTooltipImage, setShowTooltipImage] = useState(false);
    const [showPublishButton, setshowPublishButton] = useState(true);

    const username = useContext(UsernameContext);

    const textAreaRef = useRef(null);
    const inputRef = useRef(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setshowPublishButton(!e.target.value);
    }

    const handleFormSubmit = async(e: any) => {
        e.preventDefault();
        if (textAreaRef.current !== null) {
            await createPublication(textAreaRef.current.value, inputRef.current.files[0]);
            handleNewPublications(e);
        }
    }

    return (
        <div className='flex justify-center mt-4'>
            <form onSubmit={(e) => handleFormSubmit(e)} className='flex flex-col w-4/5 bg-white rounded p-5'>

                <input type='text' ref={textAreaRef} className="text-slate-700 placeholder:text-slate-500 placeholder:text-sm block
                    rounded-md py-2 pl-2 pr-3 focus:outline-none placeholder:overflow-hidden placeholder:text-ellipsis
                    w-full placeholder:sm:text-base"
                    placeholder={`${username}, What are you thinking today?`}
                    onChange={handleChange}
                    onInput={handleChange}
                />

                <label className="w-auto mt-12 p-2 text-gray-800 cursor-pointer flex justify-start sm:w-16">
                    <input type="file" className="hidden"
                        ref={inputRef}
                        onChange={handleFileChange}
                    />

                    <div className="relative">
                        <span
                            onMouseEnter={() => setShowTooltipImage(true)}
                            onMouseLeave={() => setShowTooltipImage(false)}
                            className='border-1 p-3 border-slate-500 rounded-full
                        text-sm text-slate-500
                            file:mr-4 file:p-1 sm:file:ml-4
                            file:text-sm
                            file:bg-slate-300 file:border-none
                            file:text-slate-500
                            hover:file:cursor-pointer hover:shadow-md'>
                            <i className="fa fa-image"></i>
                        </span>

                        {showTooltipImage && (
                            <div className="absolute w-20 z-10 -top-12 left-1/2 transform -translate-x-1/2 bg-slate-50 shadow-xl text-gray-800 text-xs p-2 rounded whitespace-no-wrap opacity-100">
                                {selectedFile ? selectedFile.name : "Pick image"}
                            </div>
                        )}
                    </div>
                </label>


                <div className='w-full flex flex-row justify-end mt-1 border-t-1 border-slate-300'>
                    <button className='w-auto disabled:opacity-50 disabled:bg-gray-500 mt-2 p-3 bg-sky-400 text-white border-none rounded-full
                                    cursor-pointer transition-colors hover:bg-sky-800 sm:w-20' disabled={showPublishButton}>
                        Publish
                    </button>
                </div>

            </form>
        </div>
    )
}
