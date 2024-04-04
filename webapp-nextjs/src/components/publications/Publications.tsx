import React from 'react'
import { PublicationIcons } from '../publicationIcons/PublicationIcons'
import { PublicationContent } from '../publicationContent/PublicationContent'

export const Publications = () => {
  return (
    <div className='flex justify-center'>
      <div className='mt-4 w-4/5 p-4 bg-slate-300 rounded'>
        <PublicationContent />
        <PublicationIcons />
      </div>
    </div>
  )
}
