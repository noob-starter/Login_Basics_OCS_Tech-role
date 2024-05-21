import React from 'react';
import { useParams } from 'react-router-dom';
import LoginTabs from '../components/LoginTabs';

const LoginPage = () => {
  const { role } = useParams();
  
  return (
    <div>
      <LoginTabs initialTab={role} />
    </div>
  );
};

export default LoginPage;
