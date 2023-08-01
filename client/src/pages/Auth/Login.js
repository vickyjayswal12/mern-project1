import React from 'react'
import { useState } from 'react'
import Layout from '../../components/Layout/Layout'
//this is not work after registration post not give notification so changed
// import { toast } from 'react-toastify'
import { toast } from 'react-hot-toast'

import { useAuth } from '../../context/auth'


// for communicate with backend or send request in backend
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

const Login = () => {

    //usestate

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    //useauth state
    const [auth, setAuth] = useAuth();

    //this is also hook
    const navigate = useNavigate();
    const loacation = useLocation()



    // form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const resp = await axios.post('/api/v1/auth/login', { email, password });
            // console.log(resp)
            //for print notification which get by in registration module send resp
            if (resp && resp.data.success) {
                // in this resp is which send in backend in registration controller
                toast.success(resp.data.message)
                //if login successfull than render home
                //home page par redirect
                setAuth({
                    ...auth,
                    user: resp.data.user,
                    token: resp.data.token
                })
                //page refres karane ke baad chale jaata hai data so use local storage
                localStorage.setItem("auth", JSON.stringify(resp.data))
                navigate(loacation.state || '/')
            }
            else {
                toast.error(resp.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error("something went wrong")

        }
    }


    return (
        <Layout title={'login'}>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Login Form</h4>

                    <div className="mb-3">

                        <input type="email" value={email} onChange={(e) => setemail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='email' required />

                    </div>

                    <div className="mb-3">

                        <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='password' required />
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary " onClick={() => { navigate('/forget-password') }}>Forget Password</button>

                    </div>


                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                {/* {console.log(process.env.REACT_APP_API)} */}
            </div>
        </Layout>
    )
}

export default Login
