'use client'
import React, { useEffect, useState } from 'react'

import { Header } from '@/components/header/Header'
import { getUsers } from '@/services/apiCall'
import { Loader } from '@/components/loader/Loader'
import { followUser, unFollowUser } from '@/services/apiCall'
import { FollowUser } from '@/components/follow/FollowUser'
import { UnFollowUser } from '@/components/follow/UnFollowUser'

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
                    <FollowUser usersToFollow={usersToFollow} handleFollowUser={handleFollowUser} />
                    <UnFollowUser userFollowed={userFollowed} handleUnFollowUser={handleUnFollowUser} />                    
                </>
            )}
        </div>
    )
}

export default Users