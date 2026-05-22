import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const skillSchema = new Schema(
  {
    name: { type: String, required: true },
    level: { type: Number, required: true, min: 0, max: 100 },
  },
  { _id: false },
);

const skillCategorySchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    icon: { type: String, required: true },
    accent: {
      type: String,
      enum: ['primary', 'secondary', 'tertiary', 'error'],
      required: true,
    },
    skills: { type: [skillSchema], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type SkillCategoryDoc = InferSchemaType<typeof skillCategorySchema>;
export const SkillCategory = mongoose.model('SkillCategory', skillCategorySchema);
