import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const projectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], default: [] },
    image: { type: String, default: '' },
    icon: { type: String, default: '' },
    accent: {
      type: String,
      enum: ['primary', 'secondary', 'tertiary', 'error'],
      required: true,
    },
    size: {
      type: String,
      enum: ['main', 'medium', 'small'],
      required: true,
    },
    link: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type ProjectDoc = InferSchemaType<typeof projectSchema>;
export const Project = mongoose.model('Project', projectSchema);
