import { useEffect, useRef, useState } from "react";
import "./SignUp.css";
import { DiReact } from "react-icons/di";
import { Link, useNavigate } from "react-router-dom";


const SingUp = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const navigate = useNavigate();

  const register = async () => {
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirmation = passwordConfirmationRef.current.value;
    if (!/^[A-Z][a-z]+ ([A-Z][a-z]+ ){0,2}([A-Z][a-z]+)$/.test(name)) {
      alert("Please enter a valid name");
      return;
    }
    const response = await fetch(
      `https://www.ferasjobeir.com/api/users/register`,
      {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (json.success) {
      setTimeout(() => {
        navigate("/singin");
      }, 2000);
    } else {
      window.alert(json.messages[0]);
    }
  };
  return (
    <div className="box">
      <div className="all">
        <div className="logo">{<DiReact />}</div>
        <h1 className="acc">Create Account</h1>
        <div className="SingUp">
          <label htmlFor="name">Name</label>
          <input ref={nameRef} type="text" id="name" />
          <label htmlFor="email">Email Address</label>
          <input ref={emailRef} type="email" id="email" />

          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" id="password" />

          <label htmlFor="password_confirmation">Password Confirmation</label>
          <input
            ref={passwordConfirmationRef}
            type="password"
            id="password_confirmation"
          />
          <div className="buttonss">
            <Link
              style={{
                color: "#1d9bf0",
              }}
              to="/singin"
            >
              Login
            </Link>

            <input
              type="button"
              value="Register"
              className="reg"
              onClick={register}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingUp;
