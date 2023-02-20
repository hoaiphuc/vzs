import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import googleLogo from '../assets/img/google.svg';
import axios from '../api/axios'
const LOGIN_URL = '/'

const SignIn = () => {
    const googleAuth = new GoogleAuthProvider();
    const loginGG = async () => {
        const result = await signInWithPopup(auth, googleAuth);
        navigate('/account')
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
            const response = await axios.post(LOGIN_URL, { email, password })

            const accessToken = response.data.accessToken
            localStorage.setItem('accessToken', accessToken)

            // await signIn(email, password)
            // navigate('/account')
            await signIn(accessToken)
            if (response.data.isAdmin) {
                navigate('/admin')
              } else {
                navigate('/account')
              }
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