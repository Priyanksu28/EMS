import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/assets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Response data from backend:", response.data);
        if (response.data.success) {
          setAsset(response.data.asset);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } 
    };
    fetchAsset();
  }, [id]);

  return (
    <>{ asset ? (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Asset Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <div>
          <img
            src={`http://localhost:3000/${employee.userId.profileImage}`}
            className="rounded-full border w-72"
          />
        </div> */}
        <div>
          
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Asset ID: </p>
            <p className="font-medium">{asset.assetId}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Model Number: </p>
            <p className="font-medium">{asset.modelNo}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Asset Type: </p>
            <p className="font-medium">{asset.assetType}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Location: </p>
            <p className="font-medium">{asset.location}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Department: </p>
            <p className="font-medium">{asset.department_name}</p>
          </div>
        </div>
      </div>
    </div>
    ): <div>Loading ...</div>}</>
  );
};

export default View;
