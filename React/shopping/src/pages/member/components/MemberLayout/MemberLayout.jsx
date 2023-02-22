import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import MemberAppBar from '../MemberAppBar/MemberAppBar';

const MemberLayout = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('authToken');

    return navigate('/auth/login');
  }
  
  return (
    <div className='memberLayout'>
      <MemberAppBar onLogOut={handleLogout} />
      <Outlet />
    </div>
  );
};

export default MemberLayout;
