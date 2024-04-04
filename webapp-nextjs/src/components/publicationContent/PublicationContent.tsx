import React from 'react'

export const PublicationContent = () => {
    return (
        <>
            <div className='flex justify-start items-center'>
                <img className='mr-2 rounded-full w-12 h-12 sm:w-16 sm:h-16' src='profile.png' alt='user-image' />
                <span className='text-base text-gray-800'>Marcos</span>
            </div>
            <div className='mt-4 flex justify-center'>
                <span className='text-base text-gray-800 mr-2'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis minima nostrum recusandae explicabo.
                    Commodi consequuntur ab nesciunt? Veniam officiis autem, architecto culpa provident odio ratione quod est,
                    eum consequuntur beatae.
                </span>
            </div>
            <div className='mt-4 flex justify-center'>
                <img className='rounded w-4/5 h-40 sm:h-96' src='image_post.png' alt='user-image' />
            </div>
        </>

    )
}
