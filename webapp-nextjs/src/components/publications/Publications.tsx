import React from 'react'
import { PublicationContent } from '../publicationContent/PublicationContent'

interface PublicationsProps {
  handleNewPublications: React.ChangeEventHandler<HTMLInputElement>
}

export const Publications: React.FC<PublicationsProps> = ({ handleNewPublications }) => {
  return (
    <div className='flex justify-center'>
        <PublicationContent handleNewPublications={handleNewPublications} />
    </div>
  )
}
