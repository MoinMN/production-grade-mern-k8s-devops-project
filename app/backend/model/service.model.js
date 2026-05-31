import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  index: {
    type: Number,
    required: true,
    unique: true,
  }
});

export default mongoose.model('Services', ServiceSchema);