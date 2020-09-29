import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleLogOut, initializeLoginFrameWork, signInWithEmailAndPassword } from './loginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '', 
    email: '',
    password: '',
    photoURL: '',
    error: '',
    success: false
  })

  initializeLoginFrameWork();

  //use COntext

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };


  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
        handleResponse(res, true);
    })
  }

  const fbSignIn = () => {
      handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
    })
  }
  
  const logOut = () => {
    handleLogOut()
    .then(res => {
        handleResponse(res, false)
    })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
        history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }

    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }

    if (isFieldValid) {
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res, true);
      })
    }

    if (!newUser && user.email && user.email) {
        signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
            handleResponse(res, true);
          })
    }
    e.preventDefault();
  }

  

  

  return (
    <div style={{ textAlign: 'center'}}>
      { user.isSignedIn ? <button onClick={logOut}>Logout</button> :
        <button onClick={googleSignIn}>Sign in</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign in using Facebook</button>
      {
        user.isSignedIn && 
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email address: {user.email}</p>
          <img src={user.photoURL} alt=""/>
        </div>
      
      }

      <h1>Our own Authentication</h1>
        <p style={{ color: 'red'}}>{user.error}</p>
        {
          user.success && <p style={{ color: 'green'}}>Your account has been {newUser ? 'created' : 'logged in'} successfully!</p> 
        }

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign In</label>
      <form onSubmit={handleSubmit} >
        { newUser && <input onBlur={handleBlur} type="text" name="name" id="" placeholder="Name"/> } <br/>
        <input onBlur={handleBlur} name="email" type="email"  id="" placeholder="Email" required/> <br/>
        <input onBlur={handleBlur} name="password" type="password"  id="" placeholder="Password" required/> <br/>
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
      </form>
    </div>
  );
}

export default Login;
