'use client'
import React from 'react'
import { useRouter } from 'next/navigation';

export const Option = () => {

    const router = useRouter();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
        router.push('/');
    }

    return (
        <ul className='flex flex-row justify-center list-none'>
            <li className='p-2 text-slate-500 text-sm hover:text-slate-900 cursor-pointer sm:text-base'>
                <a href='#'>
                    <i className="fa fa-gears mr-1"></i>
                    <span>Config</span>
                </a>
            </li>
            <li className='p-2 text-slate-500 text-sm hover:text-slate-900 cursor-pointer sm:text-base'>
                <button onClick={handleLogout}>
                    <i className="fa fa-arrow-down mr-1"></i>
                    <span>Logout</span>
                </button>
            </li>
        </ul>
    )
}