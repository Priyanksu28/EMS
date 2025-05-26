import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelpers'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const Edit = () => {
  const [departments, setDepartments] = useState([])
  const [asset, setAsset] = useState({
    assetId: '',
    modelNo: '',
    assetType: '',
    location: '',
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
    const fetchAsset = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/assets/${id}`,
            {
              headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
              }
              ,
            }
          );
          console.log("Response data from backend:", response.data);
          if (response.data.success) {
            const asset = response.data.asset
            setAsset((prev) => ({
              ...prev, 
              assetId: asset.assetId,
              modelNo: asset.modelNo,
              assetType: asset.assetType,
              location: asset.location,
              department: asset.department?._id || ''
            }));
          }
        } catch (error) {
          if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
          }
        } 
      };
      fetchAsset();

  }, [])


  const handleChange = (e) => {
    const {name, value} = e.target
    setAsset((prevData) => ({...prevData, [name] : value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    console.log(asset);
    

    try {
      const response = await axios.put(`http://localhost:3000/api/assets/${id}`, asset, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        
      })
      if (response.data.success) {
        navigate('/admin-dashboard/assets')
      }
      toast.success("Edited")
    } catch (error) {
      if (error.response && !error.response.data.success) {
        toast.error("Failed")
        // alert(error.response.data.error)
      }
    }
  }



  return (
    <>{departments && asset ? (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-6'>Edit Asset</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Asset ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">Asset ID</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="text"
              name='assetId'
              value={asset.assetId}
              onChange={handleChange} 
              placeholder='Enter'
              required/>
            </div>
            {/* modelNo */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">modelNo</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="text"
              name='modelNo'
              value={asset.modelNo}
              onChange={handleChange} 
              placeholder='Insert Email'
              required/>
            </div>
            {/* assetType */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">assetType</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="text"
              name='assetType'
              value={asset.assetType}
              onChange={handleChange} 
              placeholder='Enter'
              required/>
            </div>
            {/* location */}
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="">location</label>
              <input className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
              type="text"
              name='location'
              value={asset.location}
              onChange={handleChange} 
              placeholder='Enter'
              required/>
            </div>
            {/* Department */}
            <div className='col-span-2'>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select className="mt-1 p-2 block w-full border border-gray-300 rounded-md" name="department" value={asset.department} onChange={handleChange} required>
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>{dep.department_name}</option>
                ))}
              </ select>
            </div>
          </div>
          {/* Button */}
          <button className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded' type="submit">Edit Asset</button>
        </form> 
    </div>
    ) : <div>Loading...</div>}</>
  )
}

export default Edit
