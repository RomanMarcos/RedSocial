import React from 'react'

export const NotAuthorized = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <p className='text-sm text-gray-800 sm:text-base'>You are not authorized. Please
                <a href='/login' className='text-blue-800 text-base sm:text-xl'> Login </a>first.
            </p>
        </div>
    )
}
