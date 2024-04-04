'use client'
import React, { useState } from 'react'

export const NewPublication = () => {

    const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
    const [displayText, setDisplayText] = useState("Choose file");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedFile(file);
        if (file) {
          setDisplayText(file.name);
        }
    };

    return (
        <div className='flex justify-center mt-4'>
            <div className='flex flex-col justify-center items-center w-4/5 bg-slate-300 rounded p-5'>
                <textarea className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300
                    rounded-md py-2 pl-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 
                    focus:ring-1 w-full sm:text-sm"
                    placeholder={`Marcos, What are you thinking today?`}></textarea>


                <label className="w-auto mt-2 p-3 text-gray-800 cursor-pointer flex items-center justify-center sm:w-64">
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className='"w-full text-sm text-slate-500
                    file:mr-4 file:p-1 sm:file:ml-4
                    file:text-sm
                    file:bg-slate-300 file:border-none
                    file:text-slate-500
                    hover:file:cursor-pointer"'>{selectedFile ? selectedFile.name : "Pick image"}</span>
                </label>

                <button className='w-auto mt-2 p-3 bg-sky-400 text-white border-none rounded 
                    cursor-pointer transition-colors hover:bg-sky-800 sm:w-56'>Publish</button>
            </div>
        </div>
    )
}
