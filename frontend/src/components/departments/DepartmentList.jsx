import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { DepartmentButton, columns } from '../../utils/DepartmentHelpers'
import axios from 'axios'

const DepartmentList = () => {
  const [departments, setDepartments] = useState([])
  const [deploading, setDepLoading] = useState(false)
  const [filteredDepartments, setFilteredDepartments] = useState([])

  const fetchDepartment = async () => {
    setDepLoading(true)
    try {
      const response = await axios.get('http://localhost:3000/api/department', {
        headers: {
          "Authorization" : `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        let sno = 1    
        const data = response.data.departments.map((dep) => (
          {
            _id: dep._id,
            sno: sno++,
            department_name: dep.department_name,
            action: (<DepartmentButton Id={dep._id} onDepartmentDelete={onDepartmentDelete} />),
          }
        ))
        setDepartments(data)
        setFilteredDepartments(data)
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

  useEffect(() => {
    fetchDepartment()
  }, [])

  const onDepartmentDelete = async () => {
    await fetchDepartment()
  }

  const filterDepartment = (e) => {
    const records = departments.filter((dep) => dep.department_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartments(records)
  }


  return (
    <>{deploading ? <div>Loading...</div> : 
    <div className='p-5'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Departments</h3>
      </div>
      <div className='flex justify-between items-center'>
        <input className='px-4 py-0.5 border' 
        type="text" 
        placeholder='Search By Department Name' 
        onChange={filterDepartment}/>
        <Link className='px-4 py-1 bg-teal-600 rounded text-white' to="/admin-dashboard/departments/add-department">Add New Department</Link>
      </div>
      <div className='mt-5'>
        <DataTable 
          columns = {columns} data = {filteredDepartments}
        />
      </div>
    </div>
    }</>
  )
}

export default DepartmentList
