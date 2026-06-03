import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./Auth.css";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSignup = () => {

    const userData = {

      name,
      email,
      password
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(userData)
    );

    alert("Account Created Successfully");

    navigate("/login");
  };

  return (

    <div className="auth-container">

      <div className="auth-box">

        <h1>Sign Up</h1>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleSignup}>
          Create Account
        </button>

      </div>

    </div>
  );
}

export default Signup;