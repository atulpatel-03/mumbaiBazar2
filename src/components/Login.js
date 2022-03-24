import React,{ useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import fire from "../fire";
import "../asserts/scss/Login.scss";
import Logo from "../asserts/images/logo.png";

const Login = () => {

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [user, setUser] = useState('');
        
    const [formData, setFormData] = useState({
            email:'',
            password: '',
    });

    

  const clearInputs = () => {
    setFormData({...formData})
  }

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  }
    
    const onChange = e => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
    };
    
    const { email, password } = formData;

    const handleLogin = () => {
        clearErrors();
        fire
        .auth()
          .signInWithEmailAndPassword(email, password)
          .catch(err => {
            switch(err.code){
              case "auth/invalid-email":
              case "auth/user-disabled":
              case "auth/user-not-found":
                setEmailError(err.message);
                break;
              case "auth/wrong-password":
                setPasswordError(err.message);
                break;
                  
            }
        
          })
      }


  const authListener = () =>{
    fire
    .auth().onAuthStateChanged(user => {
      if(user){
        clearInputs();
        fire.firestore().collection("UsersData").doc(user.uid.toString()).get().then((query) =>{
          if(query.data().admin){
            setUser(user);
          }
          else{
            alert("Please Login With Admin Id!!")
            return;
          }
        })
      }else{
        setUser("");
      }
    })
  }

  useEffect(() => {
    authListener();
  },[])

  if(user){
    return <Redirect to='/dashboard' />
  }

    return (
        <div className="login">
        
        <div className="loginContainer">
        <img className="nav-logo-login" src={Logo}/>
        <div className='brand-name-login'>Main Mumbai Bazar</div>
            <label>Username</label>
            <input 
                type="text"
                name="email" 
                autofocus 
                required
                value ={email}
                onChange={onChange}
            />
            <p className="errorMsg">{emailError}</p>
            <label>Password</label>
            <input 
                type="password" 
                name="password"
                required
                value ={password}
                onChange={onChange}
            />
            <p className="errorMsg">{passwordError}</p>
            <div className="btnContainer">
                
                    <button to="/dashboard" onClick={handleLogin}>Sign In</button>
                   
            </div>
        </div>
        </div>
    )
}

export default Login;

  

 

