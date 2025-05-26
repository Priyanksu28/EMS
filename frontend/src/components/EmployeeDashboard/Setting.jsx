import React, { useState } from 'react'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Setting = () => {

  const navigate = useNavigate()
  const {user} = useAuth()
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const {name, value} = e.target
    setSetting({...setting, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not matched")
    }
    else {
      try {
        const response = await axios.put('http://localhost:3000/api/setting/change-password', setting,{
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
          
        })
        if (response.data.success) {
          navigate('/employee-dashboard/seeting')
          setError("")
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error)
        }
      }
    }   
}

  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
      <h2 className='text-2xl font-boldmb-6'>Change Password</h2>
      <p className='text-red-500'>{error}</p>
      <form onSubmit={handleSubmit} action="">
        <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor="">Old Password</label>
            <input
                className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                type="password"
                name='oldPassword'
                placeholder='Old Password'
                onChange={handleChange}
                required 
            />
        </div>
        <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor="">New Password</label>
            <input
                className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                type="password"
                name='newPassword'
                placeholder='New Password'
                onChange={handleChange}
                required 
            />
        </div>
        <div>
            <label className='block text-sm font-medium text-gray-700' htmlFor="">Confirm Password</label>
            <input
                className='mt-1 p-2 w-full border border-gray-300 rounded-md'
                type="password"
                name='confirmPassword'
                placeholder='Confirm Password'
                onChange={handleChange}
                required 
            />
        </div>
        <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded' type='submit'>Change Password</button>
      </form>
    </div>
  )
}

export default Setting
