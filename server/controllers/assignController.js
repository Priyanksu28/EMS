import Assign from "../models/Assign.js"
import Employee from "../models/Employee.js"


const addAssign = async (req, res) =>{
    try {
        console.log("Received body:", req.body);
        const {employeeId, assetId, assignDate} = req.body

        const newAssign = new Assign({
            employeeId, 
            assetId, 
            assignDate
        })

        await newAssign.save()

        return res.status(200).json({success: true})

    } catch (error) {
        console.error("Add Assign Error:", error);
        return res.status(500).json({success: false, error: "Server Error"})
    }
}

const deleteAssign = async (req, res) => {
    try {
        const { id } = req.params;
        await Assign.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Assignment deleted" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};


const getAssign = async (req, res) => {
    try {
        const {id} = req.params
        let assign
        assign = await Assign.find({employeeId: id}).populate('employeeId', 'employeeId').populate('assetId', 'assetId');
        if (!assign || assign.length < 1) {
            const employee = await Employee.findOne({userId: id})
            assign = await Assign.find({employeeId: employee._id}).populate('employeeId', 'employeeId').populate('assetId', 'assetId')
        }
        return res.status(200).json({success: true, assign})
    } catch (error) {
        return res.status(500).json({success: false, error: "Server Error"})
    }
}

export { addAssign, getAssign, deleteAssign };
