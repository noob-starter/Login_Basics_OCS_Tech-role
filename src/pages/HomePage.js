import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);

  const roleMapping = {
    0: 'student',
    1: 'recruiter',
    2: 'coordinator',
    3: 'staff'
  };

  return (
    <Box component="section" sx={{ p: 2, border: '2px solid black', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <p style={{ fontSize: '5rem' }}>Home Page</p>
      {data.isLoggedIn ? <Button variant="contained" color="secondary" onClick={() => dispatch(logout({}))}>Logout</Button>
        : <Button variant="contained" color="secondary" onClick={() => navigate('/login/student')}>Please Login</Button>}

      {data.isLoggedIn ? <p style={{ fontSize: '2rem', margin: '50px' }}>Successfully Logged in as <b>{data.user.name} ({roleMapping[data.user.type]})</b></p>
        : <p style={{ fontSize: '2rem', margin: '50px' }}></p>}
    </Box>
  );
};

export default HomePage;
