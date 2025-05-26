import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useAuth } from '../../context/authContext';

const List = () => {

  const [issues, setIssues] = useState(null)
  const [error, setError] = useState(null)
  let sno = 1
  const {id} = useParams()
  const {user} = useAuth()
  
  const fetchIssues = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/issue/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        console.log(response.data);

        if (response.data.success) {
            setIssues(response.data.issues)
            if (response.data.message) {
                setError(response.data.message)
            } else {
                setError(null)
            }
        } else {
            setError(response.data.error || "Failed to fetch issues")
        }
        
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            setError(error.response.data.error)
        } else {
            setError("An error occurred while fetching issues")
        }
    }
  };

  useEffect(() => {
    fetchIssues();
  }, [])

  if (error) {
    return <div className="p-5 text-red-600 font-bold">Error: {error}</div>
  }

  if (!issues) {
    return <div>Loading...</div>
  }

  return (
    <div className='p-5'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold'>Manage Issues</h3>
          </div>
          <div className='flex justify-between items-center'>
            <input 
                className='px-4 py-0.5 border' 
                type="text" 
                placeholder='Search By' 
            />
            {user.role === 'employee' && 
            <Link className='px-4 py-1 bg-teal-600 rounded text-white' to="/employee-dashboard/issues/add-issue">Add New Issue</Link>
            }
          </div>

          <table className="w-full text-sm text-left text-gray-500 mt-6">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                    <tr>
                        <th className="px-6 py-3">SNo</th>
                        <th className="px-6 py-3">Issue Type</th>
                        <th className="px-6 py-3">Asset ID</th>
                        <th className="px-6 py-3">Applied Date</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {issues.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4">No issues found.</td>
                      </tr>
                    ) : (
                      issues.map((issue) => (
                        <tr
                            key={issue._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                            <td>{sno++}</td>
                            <td>{issue.issueType}</td>
                            <td>{issue.assetId}</td>
                            <td>{new Date(issue.appliedDate).toLocaleDateString()}</td>
                            <td>{issue.reason}</td>
                            <td>{issue.status}</td>
                        </tr>
                      ))
                    )}
                </tbody>
            </table>
        </div>
  )
}

export default List
