import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginView } from '../views/loginView/LoginView';
import { SignupView } from '../views/signupView/SignupView';

export const Router = () => {
  return (
    <Routes>
        <Route path='/' element={ <LoginView  /> } />
        <Route path='/signup' element={ <SignupView  /> } />
    </Routes>
  )
}
