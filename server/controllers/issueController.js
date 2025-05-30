import Issue from "../models/Issue.js"
import Employee from "../models/Employee.js"
import mongoose from "mongoose"



const addIssue = async (req, res) => {
    try {
        const {userId, issueType, assetId, appliedDate, reason} = req.body
        const employee = await Employee.findOne({userId})

        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }
        
        
        const newIssue = new Issue({
            employeeId: employee._id, issueType, assetId, appliedDate, reason
        })

        await newIssue.save()
        console.log(newIssue);

        return res.status(200).json({success: true})

    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({success: false, error: "Server Error"})
    }
}

const getIssue = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`getIssue called with id: ${id}`);
        let issues = await Issue.find({employeeId: id})

        if (!issues.length) {
            const employee = await Employee.findOne({userId: id})
            issues = await Issue.find({employeeId: employee._id})
        }
        
        return res.status(200).json({ success: true, issues });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
}
const getIssues = async (req, res) => {
    try {
        const issues = await Issue.find().populate({
            path: 'employeeId',
            populate: [
                {
                    path: 'department',
                    select: 'department_name'
                },
                {
                    path: 'userId',
                    select: 'name'
                }
                
            ]
        })

    return res.status(200).json({success: true, issues})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, error: "Server Error"})
    }
}

const getIssueDetail = async (req, res) => {
    try {
        const {id} = req.params
        const issue = await Issue.findById({_id: id}).populate({
            path: 'employeeId',
            populate: [
                {
                    path: 'department',
                    select: 'department_name'
                },
                {
                    path: 'userId',
                    select: 'name email'
                }
                
            ]
        })

        return res.status(200).json({success: true, issue})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, error: "Server Error"})
    }
}

const updateIssue = async (req, res) => {
    try {
        const {id} = req.params
        const issue = await Issue.findByIdAndUpdate({_id: id}, {status: req.body.status})
        if(!issue) {
            return res.status(404).json({success: false, error: "Issue not found"})
        }
        return res.status(200).json({success: true})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success: false, error: "Server Error"})
    }
}

export {addIssue, getIssue, getIssues, getIssueDetail, updateIssue}
