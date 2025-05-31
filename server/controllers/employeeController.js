import multer from 'multer';
import Employee from '../models/Employee.js'
import User from '../models/User.js';
import bcrypt from 'bcrypt'
import path from 'path';
import Department from '../models/Department.js'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})


const addEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            password,
            role,
            } = req.body;
    
            const user = await User.findOne({email})
    
            if(user) {
                return res. status(400) . json({success: false, error: "user already registered in emp"})
            }
    
            const hashPassword = await bcrypt.hash(password, 10)
    
            const newUser = new User ({
                name,
                email,
                password: hashPassword,
                role,
                profileImage: req.file ? req.file.filename : ""
            })
            const saveduser = await newUser.save()
    
            const newEmployee = new Employee ({
                userId: saveduser._id,
                employeeId,
                dob,
                gender,
                maritalStatus,
                designation,
                department,
                salary
            })
            await newEmployee.save()
            return res.status(200).json({success: true, message: "employee created"})

    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({success: false, error: "server error in adding employee"})
    }
    
}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', {password: 0}).populate('department')
        return res.status(200).json({success: true, employees})
    } catch (error) {
        return res.status(500).json({success: false, error: "get employee Server Error"})
    }
}

const getEmployee = async (req, res) => {
    const {id} = req.params

    try {
        let employee
        employee = await Employee.findById({_id: id}).populate('userId', {password: 0}).populate('department')
        if (!employee) {
            employee = await Employee.findOne({userId: id}).populate('userId', {password: 0}).populate('department')
        }
        return res.status(200).json({success: true, employee})
    } catch (error) {
        return res.status(500).json({success: false, error: "get employee Server Error"})
    }
}

const editEmployee = async (req, res) => {
    try {
        const {id} = req.params;
        const {
            name, 
            email,
            employeeId,
            maritalStatus,
            designation,
            salary,
            department} = req.body;

            const employee = await Employee.findById({_id: id})
            if(!employee) {
                return res.status(404).json({success: false, error: "Employee not found"});
            }

            const user = await User.findById({_id: employee.userId})
            if(!user) {
                return res.status(404).json({success: false, error: "User not found"});
            }
            const updatedUser = await User.findByIdAndUpdate({_id: employee.userId}, {name, email})

            const updatedEmployee = await Employee.findByIdAndUpdate({_id: id}, {
                employeeId,
                maritalStatus,
                designation,
                salary,
                department
            },
            { new: true }
        )

            if(!updatedUser || !updatedEmployee) {
                return res.status(404).json({success: false, error: "Document not found"});
            }

        return res.status(200).json({success: true, message: "Employee Updated"});
    } catch (error) {
        console.error("Error updating department:", error);
        return res.status(500).json({success: false, error: "Server Error while editing employee"});
    }
};


const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        console.log(employee.userId);
        
        await User.findByIdAndDelete(employee.userId);

        
        await Employee.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Employee and user deleted" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        return res.status(500).json({ success: false, error: "Server Error while deleting employee" });
    }
};


const fetchEmployeesByDepId = async (req, res) => {
    const {id} = req.params

    try {
        const employees = await Employee.find({department: id})
        return res.status(200).json({success: true, employees})
    } catch (error) {
        return res.status(500).json({success: false, error: "get employeesByDepId Server Error"})
    }
}

export {addEmployee, upload, getEmployees, getEmployee, editEmployee, deleteEmployee, fetchEmployeesByDepId}