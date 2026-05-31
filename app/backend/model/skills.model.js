import mongoose from "mongoose";

const SkillsSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  icon: { type: String, required: true },
  index: { type: Number, required: true, unique: true },
});

export default mongoose.model('Skills', SkillsSchema);