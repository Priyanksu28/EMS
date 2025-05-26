import React from 'react'
import {NavLink} from 'react-router-dom'
import { useAuth } from '../../context/authContext'


const Sidebar = () => {
  const {user} = useAuth()
  console.log("Sidebar user._id:", user._id);
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
        <div className='bg-teal-600 h-12 flex items-center justify-center space-x-4'>
            <img className='w-10 h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGe6wbpT6mZaM3dyxG8iVMmJvHNKmgRFWeTA&s" alt="logo" />
            <h3 className='text-2xl text-center'>Asset MS</h3>
        </div>

        <div>
            <NavLink to='/employee-dashboard'
                className={({ isActive }) =>
                    `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
                  }end
                  >
                <span>Dashboard</span>
            </NavLink>
            <NavLink to={`/employee-dashboard/profile/${user._id}`}
                className={({ isActive }) =>
                    `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
                  }>
                <span>My Profile</span>
            </NavLink>
            <NavLink to={`/employee-dashboard/issues/${user._id}`}
                className={({ isActive }) =>
                    `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
                  }>
                <span>Issues</span>
            </NavLink>
            <NavLink to={`/employee-dashboard/assign/${user._id}`}
                className={({ isActive }) =>
                    `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
                  }>
                <span>Asset Assign</span>
            </NavLink>
            <NavLink to='/employee-dashboard/setting'
                className={({ isActive }) =>
                    `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 block py-2.5 px-4 rounded`
                  }>
                <span>Seetings</span>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar
