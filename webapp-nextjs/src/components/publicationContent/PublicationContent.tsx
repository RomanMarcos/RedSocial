import React, { useContext, useState } from 'react'

import { UserPublicationsContext } from '@/app/(privateContent)/dashboard/page'
import { PublicationIcons } from '../publicationIcons/PublicationIcons';
import { removePublication } from '@/services/apiCall';
import formatDate from '../../helper/dateFormatter';


const API_URL: string = 'http://localhost:3000/api';

interface PublicationContentProps {
    handleNewPublications: React.ChangeEventHandler<HTMLInputElement>
}

export const PublicationContent: React.FC<PublicationContentProps> = ({ handleNewPublications }) => {

    const publications = useContext(UserPublicationsContext);
    const userId: string | null = sessionStorage.getItem('userId');

    const handleRemovePublication = async (id: string, e: any) => {
        await removePublication(id);
        handleNewPublications(e)
    }

    return (
        <div className='flex flex-col w-full justify-center items-center'>
            {publications && publications.length > 0 ? (
                publications.map((publication: { _id: string, userId: string, author: string, description: string, image: string, created_at: string }) => {
                    return (
                        <div key={publication._id} className='mt-4 w-4/5 sm:w-4/6 p-4 bg-white rounded'>

                            {publication.userId === userId && (
                                <div className='flex justify-end items-center border-b-1 border-slate-300 mb-2'>
                                    <button onClick={(e) => handleRemovePublication(publication._id, e)} className='text-base text-slate-500 mr-4 hover:cursor-pointer hover:text-slate-900'>
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </div>
                            )}

                            <div className='flex justify-start items-center'>
                                <img className='mr-2 rounded-full w-12 h-12 sm:w-16 sm:h-16' src='default.jpg' alt='user-image' />
                                <span className='text-base text-slate-500'>{publication.author} 
                                    <p className='text-sm text-slate-800'>{formatDate(publication.created_at)}</p>
                                </span>
                            </div>

                            <div className='mt-4 flex justify-start'>
                                <span className='text-base text-slate-500 mr-2'>
                                    {publication.description}
                                </span>
                            </div>

                            {publication.image && (
                                <div className='mt-4 flex justify-center'>
                                    <img className='rounded w-4/5 h-40 sm:h-96' src={`${API_URL}/images/${publication.image}`} alt='publication image' />
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
