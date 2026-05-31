import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  image: { type: String },
  content: { type: String, required: true, trim: true },
  technology: [{ type: String }],
  githubLink: { type: String },
  websiteLink: { type: String },
  appLink: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  index: { type: Number, required: true, unique: true }
});

export default mongoose.model('Projects', ProjectSchema);