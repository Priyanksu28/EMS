import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

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
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } 
    };
    fetchEmployee();
  }, [id]);

  return (
    <>{ employee ? (
    <div className="max-w-3x1 mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2x1 font-bold mb-8 text-center">Employee Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* <img
            src={`http://localhost:3000/${employee.userId.profileImage}`}
            className="rounded-full border w-72"
          /> */}
        </div>
        <div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Name: </p>
            <p className="font-medium">{employee.userId.name}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Email: </p>
            <p className="font-medium">{employee.userId.email}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Employee ID: </p>
            <p className="font-medium">{employee.employeeId}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">DOB: </p>
            <p className="font-medium">
            {employee.dob ? new Date(employee.dob).toLocaleDateString() : "N/A"}
            </p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Gender: </p>
            <p className="font-medium">{employee.gender}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Department Name: </p>
            <p className="font-medium">{employee.department?.department_name || 'N/A'}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Marital Status: </p>
            <p className="font-medium">{employee.maritalStatus}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-1g font-bold">Designation: </p>
            <p className="font-medium">{employee.designation}</p>
          </div>
        </div>
      </div>
    </div>
    ): <div>Loading ...</div>}</>
  );
};

export default View;
