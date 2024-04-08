'use client'
import React, { useEffect, useState } from 'react'

import { Header } from '@/components/header/Header'
import { getUsers } from '@/services/apiCall'
import { Loader } from '@/components/loader/Loader'

const Users = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const users = await getUsers();
            setUsers(users);
            setIsLoading(false);
        }
        fetchData();
    }, [])

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Header />

                    <ul className='w-auto flex flex-col justify-center items-center mt-3'>
                        {users?.map((user: { _id: string, username: string, email: string }) => {
                            return (
                                <div key={user._id} className='flex justify-around flex-row border-1 p-2 rounded w-4/5 mb-2 bg-white text-slate-500 sm:w-2/3'>
                                    <div className='flex flex-col justify-center items-center w-3/4'>
                                        <li>{user.username}</li>
                                        <li>{user.email}</li>
                                    </div>
                                    <div className='flex flex-col justify-center items-center w-1/4'>
                                        <button className='text-slate-500 hover:text-slate-900'> <i className="fa fa-user-plus mr-1"></i> </button>
                                    </div>
                                </div>
                            )
                        })}
                    </ul>
                </>
            )}
        </div>
    )
}

export default Users