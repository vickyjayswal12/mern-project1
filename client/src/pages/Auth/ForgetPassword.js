import React from 'react'
import { useState } from 'react'
import Layout from '../../components/Layout/Layout'
//this is not work after registration post not give notification so changed
// import { toast } from 'react-toastify'
import { toast } from 'react-hot-toast'




// for communicate with backend or send request in backend
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ForgetPassword = () => {

    const [email, setemail] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [answer, setanswer] = useState("")



    //this is also hook
    const navigate = useNavigate();



    // form function
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const resp = await axios.post('/api/v1/auth/forget-password', { email, answer, newpassword });
            // console.log(resp)
            //for print notification which get by in registration module send resp
            if (resp && resp.data.success) {
                // in this resp is which send in backend in registration controller
                toast.success(resp.data.message)
                //if login successfull than render home
                //home page par redirect

                //page refres karane ke baad chale jaata hai data so use local storage
                localStorage.setItem("auth", JSON.stringify(resp.data))
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
        <Layout title={'login'}>
            <div className="form-container">

                <form onSubmit={handleSubmit}>
                    <h4 className='title'>Reset Password</h4>

                    <div className="mb-3">

                        <input type="email" value={email} onChange={(e) => setemail(e.target.value)} className="form-control" id="exampleInputEmail1" placeholder='email' required />

                    </div>

                    <div className="mb-3">

                        <input type="password" value={newpassword} onChange={(e) => setnewpassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='enter your new password' required />
                    </div>
                    <div className="mb-3">

                        <input type="text" value={answer} onChange={(e) => setanswer(e.target.value)} className="form-control" id="exampleInputPassword12" placeholder='enter your answer' required />
                    </div>


                    <button type="submit" className="btn btn-primary">Reset Password</button>
                </form>
                {/* {console.log(process.env.REACT_APP_API)} */}
            </div>
        </Layout>
    )

}

export default ForgetPassword
