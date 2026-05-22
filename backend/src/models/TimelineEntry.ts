import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const timelineEntrySchema = new Schema(
  {
    period: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    accent: {
      type: String,
      enum: ['primary', 'secondary', 'tertiary', 'error', 'muted'],
      required: true,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export type TimelineEntryDoc = InferSchemaType<typeof timelineEntrySchema>;
export const TimelineEntry = mongoose.model('TimelineEntry', timelineEntrySchema);
