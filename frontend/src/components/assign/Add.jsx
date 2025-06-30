import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelpers";
import { getAssets } from "../../utils/AssetHelpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [assign, setAssign] = useState({
      employeeId: null,
      
      assetId: null,
      assignDate: null
    })
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [assets, setAssets] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const loadDepartments = async () => {
      const depData = await fetchDepartments();
      setDepartments(depData || []);
    };
    loadDepartments();
  }, []);


  // useEffect(() => {                            //Form EmployeeHelpers
  //   const getAssets = async () => {
  //     const departments = await fetchDepartments();
  //     setDepartments(departments);

      
  //   };
  //   getAssets();
  // }, []);
 
  // useEffect(() => {                            //From AssetHelpers
  //   const getAssets = async () => {
  //     const departments = await fetchDepart();
  //     setDepartments(departments);
  //   };
  //   getAssets();
  // }, []);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);

    const asse = await getAssets(e.target.value);
    setAssets(asse)
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssign((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(assign);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/assign/add`,
        assign,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Assign Asset</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  name="department"
                  onChange={handleDepartment}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.department_name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Employee */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  name="employeeId"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>
              {/* Asset */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Asset
                </label>
                <select
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  name="assetId"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Asset</option>
                  {assets.map((ase) => (
                    <option key={ase._id} value={ase._id}>
                      {ase.assetId}
                    </option>
                  ))}
                </select>
              </div>
              {/* Assign Asset */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Assign Date
                </label>
                <input
                  type="date"
                  name="assignDate"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            {/* Button */}
            <button
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Assign
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Add;
