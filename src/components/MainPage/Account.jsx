import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext'

const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/')
      console.log('you are logged out');
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <Link to="/uploadfileimage" className="underline">Upload file image</Link>

      <h1 className='text-2xl font-bold -py-4'>Account</h1>
      <p>User Email: {user && user.email}</p>

      <button onClick={handleLogout} className='border px-6 py-2 my-4'>Logout</button>
    </div>
  )
}

export default Account