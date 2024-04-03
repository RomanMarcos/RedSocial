import React from 'react';
import { useRouter } from 'next/navigation';

interface ButtonProps {
    modalText: string; 
    modalLink: string;
    action: string;
    redirect: string,
    validateFields: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: React.FC<ButtonProps> = ({ modalText, modalLink, action, redirect, validateFields }) => {
  const router = useRouter();

  const handleButtonClick = (e: any) => {
    validateFields(e);
  };

  return (
    <div className='flex w-full flex-col'>
        <button className=' w-full p-3 bg-sky-400 text-white border-none rounded cursor-pointer transition-colors hover:bg-sky-800' 
          onClick={(e) => handleButtonClick(e)}> 
          {action} 
        </button>
        <p className='mt-3 text-sm text-gray-600 text-center'> {modalText} <a onClick={() => router.push(redirect)} className='text-sky-500 no-underline hover:underline cursor-pointer'> {modalLink} </a> </p>
    </div>
  );
}
