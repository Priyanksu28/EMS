import React, { useState } from 'react'
import { useAuth } from '../../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Add = () => {

    const { user } = useAuth()
    const [issue, setIssue] = useState({
        userId: user._id
    })
    const navigate = useNavigate()


    const handleChange = (e) => {
        const {name, value} = e.target
        setIssue((prevState) => ({...prevState, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/api/issue/add', issue,{
              headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
              }
              
            })
            if (response.data.success) {
              navigate(`/employee-dashboard/issues/${user._id}`)
            }
          } catch (error) {
            if (error.response && !error.response.data.success) {
              alert(error.response.data.error)
            }
          }
    }
  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold mb-6'>Request Issue</h2>
        <form onSubmit={handleSubmit} action="">
            <div className='flex flex-col space-y-4'>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="">Issue Type</label>
                    <select
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        name="issueType" 
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Issue</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Software Issue">Software Issue</option>
                    </select>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Applied Date */}
                    <div>
                        <label className='block text-sm font-medium text-gray-700' htmlFor="">
                            Applied Date
                        </label>
                        <input 
                            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                            type="date"
                            name='appliedDate' 
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                {/* Asset ID */}
                <div>
                    <label className='block text-sm font-medium text-gray-700' htmlFor="">Asset ID</label>
                    <input
                        className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                        type='text'
                        name="assetId" 
                        placeholder='Enter Asset ID'
                        onChange={handleChange}
                    ></input>
                </div>
                {/* Description */}
                <div>
                    <label className='block text-sm font-medium text-gray-700' htmlFor="">Description</label>
                    <textarea
                        className='w-full border border-grey-300'
                        name="reason" 
                        placeholder='Reason'
                        onChange={handleChange}
                    ></textarea>
                </div>
            </div>
            <button
                className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
                type='submit'
            >Report Issue</button>
        </form>
      
    </div>
  )
}

export default Add
