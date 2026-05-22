import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const helpItemSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    icon: { type: String, default: '' },
    accent: {
      type: String,
      enum: ['primary', 'secondary', 'tertiary', 'error'],
      required: true,
    },
    span: { type: Number, enum: [4, 8], required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type HelpItemDoc = InferSchemaType<typeof helpItemSchema>;
export const HelpItem = mongoose.model('HelpItem', helpItemSchema);
