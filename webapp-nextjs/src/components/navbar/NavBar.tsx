import React from 'react'

export const NavBar = () => {
    return (
        <>
            <ul className='hidden sm:flex flex-row justify-center list-none'>
                <li className='p-3 text-white hover:bg-sky-800 cursor-pointer'>
                    <a href='#'>
                        <i className="fa fa-home mr-1"></i>
                        <span>Home</span>
                    </a>
                </li>
                <li className='p-3 text-white hover:bg-sky-800 cursor-pointer'>
                    <a href='#'>
                        <i className="fa fa-user-plus mr-1"></i>
                        <span>Follows</span>
                    </a>
                </li>
                <li className='p-3 text-white hover:bg-sky-800 cursor-pointer'>
                    <a href='#'>
                        <i className="fa fa-comments mr-1"></i>
                        <span>Messages</span>
                    </a>
                </li>
            </ul>
            <ul className='sm:hidden'>
                <li className='p-2 text-white text-sm hover:bg-sky-800 cursor-pointer'>
                    <a href='#'>
                        <i className="fa fa-bars mr-1"></i>
                        <span>Menu</span>
                    </a>
                </li>
            </ul>
        </>
    )
}
