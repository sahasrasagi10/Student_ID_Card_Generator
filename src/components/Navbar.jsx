import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const user = localStorage.getItem("user");

    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/login");

        window.location.reload();
    };

    return (

        <nav className="navbar">

            <div className="nav-links">

                <Link to="/">Home</Link>

                <Link to="/about">About</Link>

                <Link to="/contact">Contact</Link>

                {
                    user ? (
                        <>
                            <Link to="/generator">Generator</Link>

                            <button
                                className="logout-btn"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>

                            <Link to="/signup">Signup</Link>
                        </>
                    )
                }

            </div>

        </nav>
    );
}

export default Navbar;