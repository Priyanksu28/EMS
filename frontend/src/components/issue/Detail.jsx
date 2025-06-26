import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/issue/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response.data);
        if (response.data.success) {
          setIssue(response.data.issue);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } 
    };
    fetchIssue();
  }, [id]);


  const changeStatus = async (id, status) => {
    try {
        const response = await axios.put(
          `http://localhost:3000/api/issue/${id}`, {status},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, status,
            },
          }
        );
        if (response.data.success) {
          navigate('/admin-dashboard/issues')
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
  }

  return (
    <>{ issue ? (
    <div className="max-w-3x1 mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2x1 font-bold mb-8 text-center">Issue Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <div>
          <img
            src={`http://localhost:3000/${issue.employee.userId.profileImage}`}
            className="rounded-full border w-72"
          />
        </div> */}
        <div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Name: </p>
            <p className="font-medium">{issue.employeeId?.userId?.name}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Asset Id: </p>
            <p className="font-medium">{issue.assetId}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Email: </p>
            <p className="font-medium">{issue.employeeId.userId.email}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Employee ID: </p>
            <p className="font-medium">{issue.employeeId.employeeId}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Issue Type: </p>
            <p className="font-medium">{issue.issueType}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Reason: </p>
            <p className="font-medium">{issue.reason}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Department Name: </p>
            <p className="font-medium">{issue.employeeId.department?.department_name || 'N/A'}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Applied Date: </p>
            <p className="font-medium">{new Date(issue.appliedDate).toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">
              {issue.status === 'Pending' ? 'Action' : 'Status'}
            </p>
            {issue.status === 'Pending' ? (
              <div className="flex space-x-2">
                <button className="px-2 py-0.5 bg-teal-300 hover:bg-teal-400" onClick={() => changeStatus(issue._id, 'Approved')}>Approvd</button>
                <button className="px-2 py-0.5 bg-teal-300 hover:bg-teal-400" onClick={() => changeStatus(issue._id, 'Rejected')}>Rejected</button>
              </div>
            ) : <p className="font-medium">{issue.status}</p>
            }
          </div>
        </div>
      </div>
    </div>
    ): <div>Loading ...</div>}</>
  );
};

export default Detail;
