import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
//uselocation is use for store last visited url
//if user valid than redirect last visited url(page) after login
const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState("3");
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevvalue) => --prevvalue)

        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        });

        return () => clearInterval(interval)
    }, [count, navigate, location, path])

    return (
        <>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
                <h1 className="text-center">redirecting to you in {count}second</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>


        </>

    )
}

export default Spinner
