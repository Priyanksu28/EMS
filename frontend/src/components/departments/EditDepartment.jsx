import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {
  const {id} = useParams()
  console.log("Department ID from URL:", id);

  const [department, setDepartment] = useState([])
  const [depLoading, setDepLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDepartment = async () => {
        setDepLoading(true)
      try {
        const response = await axios.get(`http://localhost:3000/api/department/${id}`, {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log("Response data from backend:", response.data);
        if (response.data.success) {
            setDepartment(response.data.department)
        }
      }
      catch(error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
      finally{
        setDepLoading(false)
      }
    }
    fetchDepartment()
  }, [id])
  


  const handleChange = (e) => {
    const {name, value} = e.target
    setDepartment({...department, [name]: value})
  }


  const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await axios.put(`http://localhost:3000/api/department/${id}`, department, {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          navigate('/admin-dashboard/departments')
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
    }

  return (
    <>{depLoading ? <div>Loading...</div> : 
    <div className="max-w-3xl mx-auto mt-100 bg-white p-8 rounded-md shadow-md w-96">
      <div>
        <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
        <form action="" onSubmit={handleSubmit}>
            {/* Asset Nmae */}
            <div>
                <label className="text-sm font-medium text-gray-700" htmlFor="department_name">Department Name</label>
                <input className="mt-1 w-full p-2 border border-gray-300 rounded-md" 
                type="text" 
                name='department_name'
                onChange={handleChange}
                value={department.department_name} 
                placeholder='Enter Department Name' 
                required/>
            </div>
            
            {/* Submit button (optional) */}
            <div>
              <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded' type="submit">Edit Department</button>
            </div>
        </form>
      </div>
    </div>
    }</>
  )
}

export default EditDepartment
