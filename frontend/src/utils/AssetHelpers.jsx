import { useNavigate } from "react-router-dom"
import axios from "axios"

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    },
    {
        name: "Asset Id",
        selector: (row) => row.assetId,
        sortable: true
    },
    {
        name: "Model No",
        selector: (row) => row.modelNo
    },
    {
        name: "Asset Type",
        selector: (row) => row.assetType
    },
    {
        name: "Asset Location",
        selector: (row) => row.location,
        width: "200px"
    },
    {
        name: "Asset Department",
        selector: (row) => row.department_name
    },
    {
        name: "Action",
        selector: (row) => row.action
    }
    
]






// Assets for assignment


export const getAssets = async (id) => {
    try {
    const res = await axios.get(`http://localhost:3000/api/assets/unassigned/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data.assets;
  } catch (error) {
    console.error("Error fetching unassigned assets:", error);
    return [];
  }
}

// export const getUnassignedAssets = async (deptId) => {
//   try {
//     const response = await axios.get(`http://localhost:3000/api/assets/unassigned/department/${deptId}`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       }
//     });
//     return response.data.assets;
//   } catch (error) {
//     console.error("Error fetching unassigned assets:", error);
//     return [];
//   }
// };



export const AssetButton = ({Id, onAssetDelete}) => {
    const navigate = useNavigate()
    
    const handledelete = async (id) => {
        const confirm = window.confirm("Do you want to delete ?")
        if (confirm) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/assets/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                      }
                      
                })
                console.log("Response data from backend:", response.data);
                if (response.data.success) {
                    onAssetDelete(id)
                }
              }
              catch(error) {
                if(error.response && !error.response.data.success) {
                  alert(error.response.data.error)
                }
              } 
        }

        
    }


    
    return (
        <div className="flex space-x-3">
            <button className="px-1 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/assets/${Id}`)}
            >View</button>
            <button className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/asset/${Id}`)}
            >Edit</button>
            <button className="px-1 py-1 bg-red-600 text-white"
                onClick={() => handledelete(Id)}
            >Delete</button>
        </div>
    )
}
