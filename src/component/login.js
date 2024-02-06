import React from 'react'
import { useState,useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import app from '../firebase';
import { useNavigate } from 'react-router-dom';
const auth = getAuth();

export default function Login() {
    // const { signInWithEmailAndPassword } = auth;
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const getLogin = async () => {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        //   console.log(user)
          localStorage.setItem('user', JSON.stringify(user));

            navigate('/');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        });
    }
   

  return (
    <div class='login-div'>
    
        
        <div class="container">
            <div class="pic2"></div>
            <img src="https://store-images.s-microsoft.com/image/apps.28471.14139628370441750.28b315c6-e587-4ac5-8b42-4388ed4a2f09.d5ba0d3b-63ca-4d9d-ba00-47fcfa6b02e1" alt=""/>
            <h1>Log in To Continue</h1>
            <div class="inp">
                 <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                <label for="Username">Email</label>
            </div>
            <div class="inp">
            <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
                <label  for="Password">Password</label>
            </div> 
            <button className='login-btn' onClick={()=>getLogin()}>Login</button>
        </div>
    </div>

  )
}
