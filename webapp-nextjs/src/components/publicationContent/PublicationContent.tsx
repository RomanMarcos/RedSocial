import React, { useContext, useState } from 'react'

import { UserPublicationsContext } from '@/app/(privateContent)/dashboard/page'
import { PublicationIcons } from '../publicationIcons/PublicationIcons';

import { format } from 'date-fns';

export const PublicationContent = () => {

    const publications = useContext(UserPublicationsContext);

    return (
        <div className='flex flex-col w-full justify-center items-center'>
            {publications && publications !== null ? (
                publications.map((publication: { _id: string, author: string, description: string, image: string, created_at: string }) => {
                    return (
                        <div key={publication._id} className='mt-4 w-4/5 p-4 bg-white rounded'>

                            <div className='flex justify-end items-center border-b-1 border-slate-300 mb-2'>
                                <button className='text-base text-slate-500 mr-4 hover:cursor-pointer hover:text-slate-900'>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>

                            <div className='flex justify-start items-center'>
                                <img className='mr-2 rounded-full w-12 h-12 sm:w-16 sm:h-16' src='profile.png' alt='user-image' />
                                <span className='text-base text-slate-500'>{publication.author}</span>
                            </div>

                            <div className='mt-4 flex justify-center'>
                                <span className='text-base text-slate-500 mr-2'>
                                    {publication.description}
                                </span>
                            </div>

                            {publication.image && (
                                <div className='mt-4 flex justify-center'>
                                    <img className='rounded w-4/5 h-40 sm:h-96' src={`${publication.image}`} alt='publication image' />
                                </div>
                            )}

                            <PublicationIcons />

                        </div>
                    )
                })
            ) : (
                <p>There are no publications yet!</p>
            )}
        </div>
    )
}
