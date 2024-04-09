import React from 'react'

interface UnFollowUserPropr {
    userFollowed: [],
    handleUnFollowUser: Function
}

export const UnFollowUser: React.FC<UnFollowUserPropr> = ({ userFollowed, handleUnFollowUser }) => {
    return (
        <>
            {userFollowed.length > 0 && (
                <ul className='w-auto flex flex-col justify-center items-center mt-3'>
                    {userFollowed?.map((user: { _id: string, username: string, email: string }) => {
                        return (
                            <div key={user._id} className='flex justify-around flex-row border-1 bg-green-200 p-2 rounded w-4/5 mb-2 text-slate-600 sm:w-2/3'>
                                <div className='flex flex-col justify-center items-center w-3/4'>
                                    <li>Username: {user.username} </li>
                                    <li>Email: {user.email}</li>
                                </div>
                                <div className='flex flex-col justify-center items-center w-1/4'>
                                    <button onClick={() => handleUnFollowUser(user._id)} className='text-slate-600 hover:text-slate-900'> <i className="fa fa-trash mr-1"></i> </button>
                                </div>
                            </div>
                        )
                    })}
                </ul>
            )}
        </>
    )
}
