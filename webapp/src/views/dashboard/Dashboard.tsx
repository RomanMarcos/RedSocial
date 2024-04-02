import { useEffect } from 'react';

import { profile } from '../../services/apiCall';
import { Header } from '../../components/header/Header';
import { MainContent } from '../../components/mainContent/MainContent';

export const Dashboard = () => {

  useEffect(() => {
    console.log("Entre al dashboard");
    getProfile();
  }, []);

  const getProfile = async() => {
    const { data } = await profile("asdasdasdasd");
  }

  return (
    <>
      <Header />
      <MainContent />
    </>
  )
}