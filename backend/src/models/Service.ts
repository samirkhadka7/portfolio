import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const serviceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    accent: {
      type: String,
      enum: ['primary', 'secondary', 'tertiary', 'error'],
      required: true,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type ServiceDoc = InferSchemaType<typeof serviceSchema>;
export const Service = mongoose.model('Service', serviceSchema);
