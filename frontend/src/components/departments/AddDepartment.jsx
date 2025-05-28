import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    department_name: ''
  })

  const navigate = useNavigate()


  const handleChange = (e) => {
    const {name, value} = e.target
    setDepartment({...department, [name]: value})
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/api/department/add', department, {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        navigate('/admin-dashboard/departments')
      }
      toast.success('Department Added')
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-100 bg-white p-8 rounded-md shadow-md w-96">
      <div>
        <h2 className="text-2xl font-bold mb-6">Add Department</h2>
        <form action="" onSubmit={handleSubmit}>
            {/* Department Nmae */}
            <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="department_name">Department Name</label>
                <input className="mt-1 w-full p-2 border border-gray-300 rounded-md" 
                type="text" 
                name='department_name'
                onChange={handleChange} 
                placeholder='Enter Department Name' 
                required/>
            </div>
            {/* Submit button */}
            <div>
              <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded' type="submit">Add Department</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AddDepartment
