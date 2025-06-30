import mongoose from "mongoose";
import { Schema } from "mongoose";

const assetSchema = new Schema({
    assetId: {type: String, required: true, unique: true},
    modelNo: {type: String, required: true},
    assetType: {type: String, required: true},
    location: {type: String, required: true},
    department: { type: Schema. Types. ObjectId, ref: "Department", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "Employee", default: null },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
})

const Asset = mongoose.model('Asset', assetSchema)
export default Asset
