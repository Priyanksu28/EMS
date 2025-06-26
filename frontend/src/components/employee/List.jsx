import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButton } from '../../utils/EmployeeHelpers'
import DataTable from 'react-data-table-component'


const List = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)
  const [filteredEmployees, setFilteredEmployees] = useState([])


  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get('http://localhost:3000/api/employee', {
          headers: {
            "Authorization" : `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(response.data.employees);
        
        if (response.data.success) {
          let sno = 1
          const data = await response.data.employees.map((emp) => (
            {
              _id: emp._id,
              sno: sno++,
              department_name: emp.department?.department_name || "N/A",
              name: emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString(),
              // profileImage: < img width={40} className='rounded-full' src={`http://localhost:3000/${emp. userId.profileImage}` } />,
              action: (<EmployeeButton Id={emp._id}/>)
            }
          ))
          setEmployees(data)
          setFilteredEmployees(data)
        }
      }
      catch(error) {
        if(error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      }
      finally{
        setEmpLoading(false)
      }
    }
    fetchEmployees()
  }, [])


  const handleFilter = (e) => {
    const records = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ))
    setFilteredEmployees(records)
  }

  return (
    <>{empLoading ? <div>Loading...</div> :
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employees</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input className='px-4 py-0.5 border' 
        type="text" 
        placeholder='Search By Employee'
        onChange={handleFilter} 
        />
        <Link className='px-4 py-1 bg-teal-600 rounded text-white' to="/admin-dashboard/employees/add-employee">Add New Employee</Link>
      </div>
      <div className='mt-5'>
        <DataTable columns={columns} data={filteredEmployees} pagination/>
      </div>
    </div>
    }</>
  )
}

export default List
