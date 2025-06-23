import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    reason: string;
    message: string;
}

const ContactSchema: Schema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String },
        reason: { type: String, required: true },
        message: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.models.Contact ||
    mongoose.model<IContact>("Contact", ContactSchema);
