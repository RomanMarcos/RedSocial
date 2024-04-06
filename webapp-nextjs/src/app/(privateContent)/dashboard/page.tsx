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

    const [newPublications, setNewPublications] = useState(false);

    useEffect(() => {

        const fetchUserData = async () => {
            const { user, publications } = await getUserInfo();
            setUserInfo(user);
            setUserPublications(publications);
            setUsername(user.username);
            setNewPublications(false);
        }

        fetchUserData();

    }, [newPublications]);

    const handleNewPublications = () => {
        setNewPublications(true);
    }

    return (
        <div>
            {userInfo ? (
                <>
                <UsernameContext.Provider value={username}>
                    <Header />
                    <NewPublication  handleNewPublications={handleNewPublications} />
                </UsernameContext.Provider>

                <UserPublicationsContext.Provider value={userPublications}>
                    <Publications handleNewPublications={handleNewPublications} />
                </UserPublicationsContext.Provider>
                </>
            ) : (
                <NotAuthorized />
            )}
        </div>
    )
}

export default Dashboard