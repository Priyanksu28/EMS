import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelpers'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const Edit = () => {
  const [departments, setDepartments] = useState([])
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    employeeId: '',
    // maritalStatus: '',
    designation: '',
    // salary: 0,
    department: ''
  })
  const navigate = useNavigate()
  const {id} = useParams();



  useEffect(() => {
      const getAssets = async () => {
        const departments = await fetchDepartments()
        setDepartments(departments)
      }
      getAssets()
    }, [])


  useEffect(() => {
    const fetchEmployee = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/employee/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          console.log("Response data from backend:", response.data);
          if (response.data.success) {
            const employee = response.data.employee
            setEmployee((prev) => ({
              ...prev, 
              name: employee.userId.name,
              email: employee.userId.email,
              employeeId: employee.employeeId,
              // maritalStatus: employee.maritalStatus,
              designation: employee.designation,
              // salary: employee.salary,
              department: employee.department?._id || ''
            }));
          }
        } catch (error) {
          if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
          }
        } 
      };
      fetchEmployee();

  }, [])


  const handleChange = (e) => {
    const {name, value} = e.target
    setEmployee((prevData) => ({...prevData, [name] : value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    console.log(employee);
    

    try {
      const response = await axios.put(`http://localhost:3000/api/employee/${id}`, employee, {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        navigate('/admin-dashboard/employees')
      }
      toast.success('Employee Edited')
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }



  return (
    <>{departments && employee ? (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Edit Employee</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Name</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="text"
              name='name'
              value={employee.name}
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
              value={employee.email}
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
              value={employee.employeeId}
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
              value={employee.dob ? new Date(employee.dob).toISOString().slice(0, 10) : ""}
              onChange={handleChange} 
              placeholder='DOB'
              required/>
            </div>
            {/* Marital Status
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Marital Status</label>
              <select className="mt-1 w-full p-2 border border-gray-300 rounded-md" name='maritalStatus' value={employee.maritalStatus} onChange={handleChange} required>
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
              value={employee.designation}
              onChange={handleChange} 
              placeholder='Enter Designation'
              required/>
            </div>
            {/* Salary
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Salary</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="number" 
              name='salary'
              value={employee.salary}
              onChange={handleChange}
              placeholder='Enter Salary'
              required/>
            </div> */}
            {/* Department */}
            <div className='col-span-2'>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select className="mt-1 p-2 block w-full border border-gray-300 rounded-md" name="department" value={employee.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>{dep.department_name}</option>
                ))}
              </ select>
            </div>
          </div>
          {/* Button */}
          <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded' type="submit">Edit Employee</button>
        </form> 
    </div>
    ) : <div>Loading...</div>}</>
  )
}

export default Edit
