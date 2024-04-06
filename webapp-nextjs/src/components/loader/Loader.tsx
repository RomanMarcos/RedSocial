import React from 'react'

export const Loader = () => {
    return (
        <div className="relative flex justify-self-center items-center h-screen">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 animate-spin rounded-full border-slate-900 border-t-1"></div>
            </div>
        </div>
    )
}
