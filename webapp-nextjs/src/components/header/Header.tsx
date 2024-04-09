import React from 'react'
import { NavBar } from '../navbar/NavBar'
import { Option } from '../option/Option'

export const Header = () => {
    return (
        <div className='flex flex-row justify-around bg-white sm:justify-around'>
            <NavBar />
            <Option />
        </div>
    )
}
