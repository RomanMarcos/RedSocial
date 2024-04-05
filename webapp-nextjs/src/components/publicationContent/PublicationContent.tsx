import React, { useContext } from 'react'

import { UserPublicationsContext } from '@/app/(privateContent)/dashboard/page'
import { PublicationIcons } from '../publicationIcons/PublicationIcons';

export const PublicationContent = () => {

    const publications = useContext(UserPublicationsContext);

    return (
        <div className='flex flex-col w-full justify-center items-center'>
            {publications && publications !== null ? (
                publications.map((publication: { author: string, description: string, image: string }) => {
                    return (
                        <div className='mt-4 w-4/5 p-4 bg-slate-300 rounded'>
                            <div className='flex justify-start items-center'>
                                <img className='mr-2 rounded-full w-12 h-12 sm:w-16 sm:h-16' src='profile.png' alt='user-image' />
                                <span className='text-base text-gray-800'>{publication.author}</span>
                            </div>
                            <div className='mt-4 flex justify-center'>
                                <span className='text-base text-gray-800 mr-2'>
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
