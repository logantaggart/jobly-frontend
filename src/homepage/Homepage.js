import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../auth/UserContext'
import './Homepage.css'

function Homepage() {
    const { currUser } = useContext(UserContext)

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Jobly</h1>
                <br />
                <p className="lead">
                    <u>
                        THE JOB FINDING COMMUNITY
                    </u>
                    <br /> <br /> <br />
                </p>
                {currUser ?
                    <h4>
                        Welcome Back, {currUser.firstName || currUser.username}!
                    </h4>
                    : (
                        <p>
                            <Link className="btn btn-outline-primary font-weight-bold mr-3" to="/login">
                                Log in
                            </Link>
                            <Link className="btn btn-outline-primary font-weight-bold" to="/signup">
                                Sign up
                            </Link>
                        </p>
                    )}
            </div>
        </div>
    )
}

export default Homepage