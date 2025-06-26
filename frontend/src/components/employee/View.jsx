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
    <>
      {employee ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="max-w-3xl w-full bg-white p-8 rounded-md shadow-md">
    <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Optional Profile Image Section */}
      {/* <div>
        <img
          src={`http://localhost:3000/${employee.userId.profileImage}`}
          className="rounded-full border w-72"
        />
      </div> */}
      <div className="space-y-4 md:col-span-2">
        {[
          ["Name", employee.userId.name],
          ["Email", employee.userId.email],
          ["Employee ID", employee.employeeId],
          ["DOB", employee.dob ? new Date(employee.dob).toLocaleDateString() : "N/A"],
          ["Gender", employee.gender],
          ["Department Name", employee.department?.department_name || "N/A"],
          // ["Marital Status", employee.maritalStatus],
          ["Designation", employee.designation]
        ].map(([label, value]) => (
          <div key={label} className="grid grid-cols-2 gap-2">
            <p className="font-semibold">{label}:</p>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default View;
