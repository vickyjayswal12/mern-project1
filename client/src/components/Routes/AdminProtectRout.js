import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
// for use nested routing
import { Outlet } from "react-router-dom";
import axios from 'axios'
import Spinner from "../spinner";

export default function AdminRoute() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            const resp = await axios.get('/api/v1/auth/admin-auth' )
            if (resp.data.ok) {
                setOk(true)
            }
            else {
                setOk(false)
            }
        };
        if (auth?.token) authCheck();
    }, [auth?.token])
    //empty array [] means jab page first time refres hoga tab call hoga if not include array than any time page render than useeffect call
    return ok ? <Outlet /> : <Spinner path="" />;
    //otlet use send nested routes acces which is protected
}