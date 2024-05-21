import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { login } from '../redux/slices/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSuccess = (response) => {

    // Decode the Response 
    const token = response.access_token;
    axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const profileObj = {
          name: response.data.name.toLowerCase(),
          email: response.data.email,
          type: 0
        }

        // Check if the user is new or existing using local storage
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const isNewUser = !existingUsers.some((user, type) => user.email === profileObj.email && type === profileObj.type);

        if (isNewUser) {
          localStorage.setItem('users', JSON.stringify([...existingUsers, profileObj]));
        }

        // Dispatch login action to redux store 
        dispatch(login({ user: profileObj, isNewUser }));

        // Redirect to home page 
          navigate('/');

      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });

  };

  const handleLoginFailure = (error) => {
    console.error('Google Login Failed', error);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onFailure: handleLoginFailure,
  });

  return (
    <Button variant="contained" color="primary" onClick={() => googleLogin()}>
      Login with Google
    </Button>
  );
};

export default StudentLogin;
