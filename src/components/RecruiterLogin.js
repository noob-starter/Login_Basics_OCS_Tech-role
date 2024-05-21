import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import Captcha from 'captcha-image';
import { login } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

const RecruiterLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    // const captchaContent = document.getElementById('captcha').innerHTML;

    // Check for correct email
    console.log(validator.isEmail(email));

    if (validator.isEmail(email)) {

      const profileObj = {
        name: email.split('@')[0].toLowerCase(),
        email: email.toLocaleLowerCase(),
        password: password,
        type: 1
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
    } else {
      alert('Invalid email address. Please update!!!')
    }

  };

  const captchaImage = new Captcha(
    '35px Arial',
    'center',
    'middle',
    200,
    80,
    '#dddddd',
    '#333333',
    6
  ).createImage();

  function createMarkup(source) {
    return { __html: source };
  }

  function MyCaptcha() {
    return <div id='captcha' dangerouslySetInnerHTML={createMarkup(captchaImage)} />;
  }

  return (
    <form>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />

      <MyCaptcha />

      <TextField
        label="Captcha"
        value={captcha}
        onChange={(e) => setCaptcha(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </form>
  );
};

export default RecruiterLogin;
