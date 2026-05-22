import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const statSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    accent: {
      type: String,
      enum: ['primary', 'secondary', 'tertiary', 'error'],
      required: true,
    },
  },
  { _id: false },
);

const languageSchema = new Schema(
  {
    name: { type: String, required: true },
    percentage: { type: Number, required: true, min: 0, max: 100 },
    accent: {
      type: String,
      enum: ['primary', 'secondary', 'tertiary', 'error'],
      required: true,
    },
  },
  { _id: false },
);

const navLinkSchema = new Schema(
  {
    href: { type: String, required: true },
    label: { type: String, required: true },
  },
  { _id: false },
);

const socialsSchema = new Schema(
  {
    twitter: { type: String, default: '#' },
    github: { type: String, default: '#' },
    linkedin: { type: String, default: '#' },
  },
  { _id: false },
);

const siteConfigSchema = new Schema(
  {
    singletonKey: { type: String, default: 'site', unique: true, index: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, default: '' },
    status: { type: String, default: '' },
    email: { type: String, required: true },
    resumeUrl: { type: String, default: '#' },
    avatar: { type: String, default: '' },
    socials: { type: socialsSchema, default: () => ({}) },
    terminalPhrases: { type: [String], default: [] },
    navLinks: { type: [navLinkSchema], default: [] },
    aboutStats: { type: [statSchema], default: [] },
    githubStats: { type: [statSchema], default: [] },
    topLanguages: { type: [languageSchema], default: [] },
  },
  { timestamps: true },
);

export type SiteConfigDoc = InferSchemaType<typeof siteConfigSchema>;
export const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);
