import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  comment: { type: String, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  isApproved: { type: Boolean, required: true, default: false },
  verificationCode: { type: String },
  profile: { type: String, default: process.env.FRONTEND_URL + process.env.DEFAULT_CLIENT_IMG_SRC }
}, { timestamps: true });

export default mongoose.model('Testimonials', TestimonialSchema);