import React from 'react'

export const PublicationIcons = () => {
    return (
        <div className='mt-4 flex justify-around sm:justify-center'>
            <div className='sm:mr-10'>
                <i className="fa fa-comment"></i>
                <span className='ml-1'>5</span>
            </div>
            <div className='sm:mr-10'>
                <i className="fa fa-retweet"></i>
                <span className='ml-1'>2</span>
            </div>
            <div className='sm:mr-10'>
                <i className="fa fa-heart"></i>
                <span className='ml-1'>3</span>
            </div>
        </div>
    )
}
