import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import axios from 'axios';
import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer
} from 'recharts';

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/dashboard/summary', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSummary(response.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.error(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div>Loading...</div>;
  }

  const COLORS = ['#00C49F', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#a83232'];


  return (
    <div className="pt-24">
      <h3 className="text-2xl font-bold ml-5 mt-3">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 ml-5 mr-5">
        <SummaryCard text="Total Employees" number={summary.totalEmployees} color="bg-teal-600" />
        <SummaryCard text="Total Departments" number={summary.totalDepartments} color="bg-yellow-600" />
        <SummaryCard text="Total Assets" number={summary.totalAssets} color="bg-red-600" />
      </div>

      <div>
        <h4 className="text-center text-2xl font-bold mt-6">Issue Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ml-5 mr-5">
          <SummaryCard text="Applied" number={summary.issueSummary.appliedFor} color="bg-teal-600" />
          <SummaryCard text="Approved" number={summary.issueSummary.approved} color="bg-green-600" />
          <SummaryCard text="Pending" number={summary.issueSummary.pending} color="bg-yellow-600" />
          <SummaryCard text="Rejected" number={summary.issueSummary.rejected} color="bg-red-600" />
        </div>
      </div>

      {/* Assigned vs Unassigned Assets Pie Chart */}
      <h4 className="text-center text-xl font-semibold mt-10">Assigned vs Unassigned Assets</h4>
      <div className="w-full h-80 px-5">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="value"
              data={[
                { name: 'Assigned', value: summary.assignedAssets },
                { name: 'Unassigned', value: summary.unassignedAssets },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              isAnimationActive={true}
            >
              {[
                { name: 'Assigned', value: summary.assignedAssets },
                { name: 'Unassigned', value: summary.unassignedAssets },
              ].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Assets by Department Bar Chart */}
      <h4 className="text-center text-xl font-semibold mt-10">Assets by Department</h4>
      <div className="w-full h-80 px-5">
        <ResponsiveContainer>
          <BarChart data={summary.assetsByDepartment}>
            <XAxis dataKey="_id" angle={-30} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Assets by Category Bar Chart */}
      <h4 className="text-center text-xl font-semibold mt-10">Assets by Category</h4>
      <div className="w-full h-80 px-5">
        {!summary.assetsByCategory || summary.assetsByCategory.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No data available</p>
        ) : (
          <ResponsiveContainer>
            <BarChart data={summary.assetsByCategory}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
};

export default AdminSummary;
