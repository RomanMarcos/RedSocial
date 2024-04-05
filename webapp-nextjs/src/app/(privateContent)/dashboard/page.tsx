'use client'
import React, { useEffect, useState, useContext, createContext } from 'react'

import { Header } from '@/components/header/Header'
import { NewPublication } from '@/components/newPublication/NewPublication'
import { Publications } from '@/components/publications/Publications'
import { getUserInfo } from '@/services/apiCall'
import { NotAuthorized } from '@/components/notAuthorized/NotAuthorized'

export const UsernameContext = createContext('');
export const UserPublicationsContext = createContext([]);

const Dashboard = () => {

    const [userInfo, setUserInfo] = useState(null);
    const [userPublications, setUserPublications] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {

        const fetchUserData = async () => {
            const { user, publications } = await getUserInfo();
            setUserInfo(user);
            setUserPublications(publications);
            setUsername(user.username);
        }

        fetchUserData();

    }, []);

    return (
        <div>
            {userInfo ? (
                <>
                <UsernameContext.Provider value={username}>
                    <Header />
                    <NewPublication />
                </UsernameContext.Provider>

                <UserPublicationsContext.Provider value={userPublications}>
                    <Publications />
                </UserPublicationsContext.Provider>
                </>
            ) : (
                <NotAuthorized />
            )}
        </div>
    )
}

export default Dashboard