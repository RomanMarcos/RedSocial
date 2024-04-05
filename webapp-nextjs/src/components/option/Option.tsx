import React, { useContext } from 'react'
import { UsernameContext } from '@/app/(privateContent)/dashboard/page';

export const Option = () => {
    
    const username = useContext(UsernameContext);

    return (
        <ul className='flex flex-row justify-center list-none'>
            <li className='p-2 text-white text-sm hover:cursor-pointer sm:text-base sm:p-3'>
                <span>{`Hi, ${username}!`}</span>
            </li>
            <li className='p-2 text-white text-sm hover:bg-sky-800 cursor-pointer sm:text-base sm:p-3'>
                <a href='#'>
                    <i className="fa fa-gears mr-1"></i>
                    <span>Config</span>
                </a>
            </li>
            <li className='p-2 text-white text-sm hover:bg-sky-800 cursor-pointer sm:text-base sm:p-3'>
                <a href='#'>
                    <i className="fa fa-arrow-down mr-1"></i>
                    <span>Logout</span>
                </a>
            </li>
        </ul>
    )
}