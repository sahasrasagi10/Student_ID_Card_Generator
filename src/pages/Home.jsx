import { Link } from 'react-router-dom'

import './Home.css'

function Home() {

    return (

        <div className="home-page">

            <h1>
                Student ID Card Generator
            </h1>

            <p>
                Create professional student ID cards easily for schools and colleges.
            </p>

            <Link to="/generator">

                <button className="generate-btn">

                    Generate ID Card

                </button>

            </Link>

        </div>
    )
}

export default Home