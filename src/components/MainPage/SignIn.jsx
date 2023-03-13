// import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import googleLogo from '../../../src/assets/img/google.svg';
import { loginGoogle } from '../../common/feartures/authSlice';

const SignIn = () => {
    const isAuthenticated = localStorage.getItem('user') ? true : false
    const dispatch = useDispatch();
    // const googleAuth = new GoogleAuthProvider();
    const loginGG = async () => {
        if (isAuthenticated) {
            navigate('/profile')
        } else {
            await dispatch(loginGoogle())
        }
        // if (isAuthenticated) {
        //     navigate('/profile')
        // }
        // isAuthenticated && console.log("isAuthenticated: ", isAuthenticated)

        // const result = await signInWithPopup(auth, googleAuth);
        // const token = result.user.getIdToken().then((token) => {
        //     loginAPI(token).then(data => {
        //         console.log(data)
        //     })
        //     console.log("token: ", token)
        // })
        // navigate('/profile')
    }

    //login gmail password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const { signIn } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await signIn(email, password)
            navigate('/profile')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }
    return (
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <div>
                <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
                <p>
                    Don't have an account yet? <Link to="/signup" className="underline">Sign up</Link>
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Email address</label>
                    <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type="email" />
                </div>
                <div className='flex flex-col py-2'>
                    <label className='py-2 font-medium'>Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type="password" />
                </div>
                <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
                    Sign In
                </button>
            </form>

            <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal py-2 px-4 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" onClick={loginGG} >
                <img src={googleLogo} alt="Google logo" className="w-5 h-5 mr-2 inline-block" />
                Login with Google
            </button>
        </div>
    )
}

export default SignIn