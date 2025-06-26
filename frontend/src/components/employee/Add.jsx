import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelpers'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Add = () => {
  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const getAssets = async () => {
      const departments = await fetchDepartments()
      setDepartments(departments)
      
    }
    getAssets()
  }, [])


  const handleChange = (e) => {
    const {name, value, files} = e.target
    if(name === "image") {
      setFormData((prevData) => ({...prevData, [name] : files[0]}))
    }
    else {
      setFormData((prevData) => ({...prevData, [name] : value}))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formDataObj = new FormData()
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key])
    })

    try {
      const response = await axios.post('http://localhost:3000/api/employee/add', formDataObj, {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        navigate('/admin-dashboard/employees')
      }
      toast.success('Employee Added')
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }



  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Name</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="text"
              name='name'
              onChange={handleChange} 
              placeholder='Enter Name'
              required/>
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Email</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="text"
              name='email'
              onChange={handleChange} 
              placeholder='Insert Email'
              required/>
            </div>
            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Employee ID</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="text"
              name='employeeId'
              onChange={handleChange} 
              placeholder='Enter Employee ID'
              required/>
            </div>
            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Date of Birth</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="date"
              name='dob'
              onChange={handleChange} 
              placeholder='DOB'
              required/>
            </div>
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Gender</label>
              <select className="mt-1 w-full p-2 border border-gray-300 rounded-md" name='gender' onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            {/* Marital Status
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Marital Status</label>
              <select className="mt-1 w-full p-2 border border-gray-300 rounded-md" name='maritalStatus' onChange={handleChange} required>
                <option value="">Select Marital Status</option>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
              </select>
            </div> */}
            {/* Designation */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Designation</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="text"
              name='designation'
              onChange={handleChange} 
              placeholder='Enter Designation'
              required/>
            </div>
            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select className="mt-1 p-2 block w-full border border-gray-300 rounded-md" name="department" onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>{dep.department_name}</option>
                ))}
              </ select>
            </div>
            {/* Salary
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Salary</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="number" 
              name='salary'
              onChange={handleChange}
              placeholder='Enter Salary'
              required/>
            </div> */}
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Password</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="password"
              name='password'
              onChange={handleChange} 
              placeholder='********'
              required/>
            </div>
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="asset_type">Role</label>
              <select className="mt-1 w-full p-2 border border-gray-300 rounded-md" name='role' onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            {/* Image Upload
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Upload Image</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="file"
              name='image'
              onChange={handleChange} 
              placeholder='Upload Image'
              accept='image/*'
              required/>
            </div> */}
          </div>
          {/* Button */}
          <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded' type="submit">Add Employee</button>
        </form> 
    </div>
  )
}

export default Add
