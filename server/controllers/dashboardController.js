import Employee from '../models/Employee.js';
import Department from '../models/Department.js';
import Issue from '../models/Issue.js';
import Asset from '../models/Asset.js';
import Assign from '../models/Assign.js'; // Add this

const getSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments()
    const totalDepartments = await Department.countDocuments()
    const totalAssets = await Asset.countDocuments()

    const employeeAppliedForIssue = await Issue.distinct('employeeId')
    const issueStatus = await Issue.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ])

    const issueSummary = {
      appliedFor: employeeAppliedForIssue.length,
      approved: issueStatus.find(item => item._id === 'Approved')?.count || 0,
      rejected: issueStatus.find(item => item._id === 'Rejected')?.count || 0,
      pending: issueStatus.find(item => item._id === 'Pending')?.count || 0
    }

    const assignedAssetIds = await Assign.distinct('assetId');
    const assignedAssets = assignedAssetIds.length;
    const unassignedAssets = await Asset.countDocuments({
        _id: { $nin: assignedAssetIds }
    });

    const assetsByDepartment = await Asset.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
            from: "departments",
            localField: "_id",
            foreignField: "_id",
            as: "departmentDetails"
        }
        },
        {
        $unwind: {
            path: "$departmentDetails",
            preserveNullAndEmptyArrays: true
        }
        },
        {
        $project: {
            _id: {
            $ifNull: ["$departmentDetails.department_name", "Unknown"]
            },
            count: 1
        }
        }

    ])

    const assetsByCategory = await Asset.aggregate([
      {
        $group: {
          _id: "$assetType",
          count: { $sum: 1 }
        }
      }
    ])

    return res.status(200).json({
      success: true,
      totalEmployees,
      totalDepartments,
      totalAssets,
      issueSummary,
      assignedAssets,
      unassignedAssets,
      assetsByDepartment,
      assetsByCategory
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, error: "Dashboard Summary Error" })
  }
}

export { getSummary }

