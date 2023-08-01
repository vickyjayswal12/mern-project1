import React from 'react'
import { useState } from 'react'
import Layout from '../../components/Layout/Layout'
//this is not work after registration post not give notification so changed
// import { toast } from 'react-toastify'
import { toast } from 'react-hot-toast'


// for communicate with backend or send request in backend
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {

    //usestate
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [phone, setphone] = useState("")
    const [address, setaddress] = useState("")
    const [answer, setanswer] = useState("")
    //this is also hook
    const navigate = useNavigate();



    // form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const resp = await axios.post('/api/v1/auth/register', { name, email, password, phone, address, answer });
            console.log(resp)
            //for print notification which get by in registration module send resp
            if (resp && resp.data.success) {
                // in this resp is which send in backend in registration controller
                toast.success(resp.data.message)
                //if register successfull than render login
                //login page par redirect
                navigate('/login')
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
        <Layout title={'register'}>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Register Form</h4>
                    <div className="mb-3">

                        <input type="text" value={name} onChange={(e) => setname(e.target.value)} className="form-control" id="exampleInputName" placeholder='enter your name' required />

                    </div>
                    <div className="mb-3">

                        <input type="email" value={email} onChange={(e) => setemail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='email' required />

                    </div>

                    <div className="mb-3">

                        <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='password' required />
                    </div>
                    <div className="mb-3">

                        <input type="text" value={phone} onChange={(e) => setphone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder='enter your phone' required />

                    </div>
                    <div className="mb-3">

                        <input type="text" value={address} onChange={(e) => setaddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder='enter your address' required />

                    </div>

                    <div className="mb-3">

                        <input type="text" value={answer} onChange={(e) => setanswer(e.target.value)} className="form-control" id="exampleInputAnswer" placeholder='enter your favorite sport' required />

                    </div>

                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                {/* {console.log(process.env.REACT_APP_API)} */}
            </div>
        </Layout>
    )
}


export default Register

// for communicate with backend use axios in react
// and for post notifiaction use react-toastify