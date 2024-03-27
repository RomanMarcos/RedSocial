import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginView } from '../views/loginView/LoginView';
import { SignupView } from '../views/signupView/SignupView';
import { Dashboard } from '../views/dashboard/Dashboard';

export const Router = () => {
  return (
    <Routes>
        <Route path='/' element={ <LoginView  /> } />
        <Route path='/signup' element={ <SignupView  /> } />
        <Route path='/dashboard' element={ <Dashboard  /> } />
    </Routes>
  )
}
