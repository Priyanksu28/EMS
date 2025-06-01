import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelpers'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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
      const response = await axios.post('http://localhost:3000/api/assets/add', formDataObj, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        
      })
      if (response.data.success) {
        navigate('/admin-dashboard/assets')
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }



  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Add New Asset</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Asset ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Asset ID</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="text"
              name='assetId'
              onChange={handleChange} 
              placeholder='Enter Asset ID'
              required/>
            </div>
            {/* Model Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Model Number</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="text"
              name='modelNo'
              onChange={handleChange} 
              placeholder='Enter'
              required/>
            </div>
            {/* Asset Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Asset Type</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="text"
              name='assetType'
              onChange={handleChange} 
              placeholder='Enter'
              required/>
            </div>
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Location</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="text"
              name='location'
              onChange={handleChange} 
              placeholder='Enter'
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
            {/* Image Upload */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Upload Image</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="file"
              name='image'
              onChange={handleChange} 
              placeholder='Upload Image'
              accept='image/*'
              />
            </div> */}
          </div>
          {/* Button */}
          <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded' type="submit">Add Asset</button>
        </form> 
    </div>
  )
}

export default Add
