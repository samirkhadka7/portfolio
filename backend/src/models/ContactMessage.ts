import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const contactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    service: { type: String, default: '' },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type ContactMessageDoc = InferSchemaType<typeof contactMessageSchema>;
export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
