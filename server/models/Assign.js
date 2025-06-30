import mongoose from "mongoose";
import { Schema } from "mongoose";

const assignSchema = new Schema({
    employeeId: { type: Schema. Types. ObjectId, ref: "Employee", required: true },
    
    assetId: { type: Schema. Types. ObjectId, ref: "Asset", required: true },
    
    assignDate: {type: Date, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const Assign = mongoose.model('Assign', assignSchema)
export default Assign
