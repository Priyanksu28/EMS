import mongoose from "mongoose";
import { Schema } from "mongoose";

const issueSchema = new Schema({
    employeeId: { type: Schema. Types. ObjectId, ref: "Employee", required: true },
    issueType: { type: String, enum: ['Damaged', 'Software Issue'], required: true },
    assetId: { type: String, required: true },
    appliedDate: { type: Date, required: true },
    reason: {type: String, required: true},
    status: { type: String, enum: ['Approved', 'Rejected', 'Pending'] , default: 'Pending' },
    appliedAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const Issue = mongoose.model('Issue', issueSchema)
export default Issue
