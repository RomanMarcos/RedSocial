'use client'
import React, { useEffect, useState } from 'react'

import { Header } from '@/components/header/Header'
import { getUsers } from '@/services/apiCall'
import { Loader } from '@/components/loader/Loader'
import { followUser, unFollowUser } from '@/services/apiCall'

const Users = () => {

    const [userFollowed, setUserFollowed] = useState([]);
    const [usersToFollow, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshPage, setRefreshPage] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setRefreshPage(false);
            setIsLoading(true);
            const { usersToFollow, followedUsers } = await getUsers();
            setUserFollowed(followedUsers);
            setUsers(usersToFollow);
            setIsLoading(false);
        }
        fetchData();
    }, [refreshPage])

    const handleFollowUser = async (id: string) => {
        await followUser(id);
        setRefreshPage(true);
    }

    const handleUnFollowUser = async (id: string) => {
        await unFollowUser(id);
        setRefreshPage(true);
    }

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Header />
                    {usersToFollow.length > 0 && (
                        <ul className='w-auto flex flex-col justify-center items-center mt-3'>
                            <h1>Follow</h1>
                            {usersToFollow?.map((user: { _id: string, username: string, email: string }) => {
                                return (
                                    <div key={user._id} className='flex justify-around flex-row border-1 p-2 rounded w-4/5 mb-2 bg-white text-slate-500 sm:w-2/3'>
                                        <div className='flex flex-col justify-center items-center w-3/4'>
                                            <li>{user.username}</li>
                                            <li>{user.email}</li>
                                        </div>
                                        <div className='flex flex-col justify-center items-center w-1/4'>
                                            <button onClick={() => handleFollowUser(user._id)} className='text-slate-500 hover:text-slate-900'> <i className="fa fa-user-plus mr-1"></i> </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </ul>
                    )}
                    {userFollowed.length > 0 && (
                        <ul className='w-auto flex flex-col justify-center items-center mt-3'>
                            <h1>Followed users</h1>
                            {userFollowed?.map((user: { _id: string, username: string, email: string }) => {
                                return (
                                    <div key={user._id} className='flex justify-around flex-row border-1 p-2 rounded w-4/5 mb-2 bg-white text-slate-500 sm:w-2/3'>
                                        <div className='flex flex-col justify-center items-center w-3/4'>
                                            <li>{user.username}</li>
                                            <li>{user.email}</li>
                                        </div>
                                        <div className='flex flex-col justify-center items-center w-1/4'>
                                            <button onClick={() => handleUnFollowUser(user._id)} className='text-slate-500 hover:text-slate-900'> <i className="fa fa-trash mr-1"></i> </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </ul>
                    )}
                </>
            )}
        </div>
    )
}

export default Users