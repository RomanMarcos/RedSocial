import { Header } from '@/components/header/Header'
import { NewPublication } from '@/components/newPublication/NewPublication'
import { Publications } from '@/components/publications/Publications'
import React from 'react'

const Dashboard = () => {

    return (
        <div>
            <Header />
            <NewPublication />
            <Publications />
        </div>
    )
}

export default Dashboard