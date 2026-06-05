import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "./Auth.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = () => {

        const storedUser = JSON.parse(
            localStorage.getItem("registeredUser")
        );

        if (!storedUser) {

            alert("No account found");

            return;
        }

        if (
            email === storedUser.email &&
            password === storedUser.password
        ) {

            localStorage.setItem(
                "studentUser",
                JSON.stringify(storedUser)
            );

            alert("Login Successful");

            navigate("/generator");

            window.location.reload();

        } else {

            alert("Invalid Email or Password");
        }
    };

    return (

        <div className="auth-container">

            <div className="auth-box">

                <h1>Login</h1>

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

                <button onClick={handleLogin}>
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;