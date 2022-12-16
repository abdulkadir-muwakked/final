import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AtuthContext"
import { DiReact } from "react-icons/di";


const SingIn = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    const authCtx = useContext(AuthContext)

    const SingIn = async () => {
        const email = emailRef.current.value
        const password = passwordRef.current.value
        const response = await fetch(`https://www.ferasjobeir.com/api/users/login`, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        
        if (json.success) {
            // logged in successfully
            authCtx.signIn(json.data, json.token)
            navigate('/')
        } else {
            window.alert(json.messages[0])
        }
    }
  return (
    <div className="box">
      <div className="all">
        <div className="logo">{<DiReact />}</div>
        <h1 className="acc">Login</h1>
        <div className="SingUp">
          
          <label htmlFor="email">Email Address</label>
          <input ref={emailRef} type="email" id="email" />

          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" id="password" />

         
          <div className="buttonss">
            <Link
              style={{
                color: "#1d9bf0",
              }}
              to="/"
            >
              Register
            </Link>

            <input
              type="button"
              value="Login"
              className="reg"
              onClick={SingIn}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
 

export default SingIn;