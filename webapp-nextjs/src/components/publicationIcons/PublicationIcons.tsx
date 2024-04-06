import React from 'react'

export const PublicationIcons = () => {
    return (
        <div className='mt-4 pt-4 flex justify-around sm:justify-around border-t-1 border-slate-300'>
            <div className='sm:mr-10'>
                <i className="fa fa-thumbs-up hover:cursor-pointer text-slate-500 hover:text-slate-900"> Like </i>
            </div>
            <div className='sm:mr-10'>
                <i className="fa fa-comment hover:cursor-pointer text-slate-500 hover:text-slate-900"> Comment </i>
            </div>
            <div className='sm:mr-10'>
                <i className="fa fa-retweet hover:cursor-pointer text-slate-500 hover:text-slate-900"> Share </i>
            </div>
        </div>
    )
}
