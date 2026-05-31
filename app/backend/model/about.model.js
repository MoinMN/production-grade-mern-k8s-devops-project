import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  // I am ...
  tagLineSkills: [{ type: String, }],
  aboutMeContent: { type: String, trim: true },

  // Singleton enforcement
  singleton: {
    type: Boolean,
    required: true,
    default: true,
    unique: true // Ensure that only one document can have this field
  }
});

export default mongoose.model('Abouts', AboutSchema);