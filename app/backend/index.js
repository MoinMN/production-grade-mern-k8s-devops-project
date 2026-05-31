import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from "express-fileupload";
import os from "os";

const app = express();
const PORT = process.env.PORT || 4518;

dotenv.config();
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 } })); // 5MB limit

// database connection here 
import connectDB from './config/MongoDB.js';
connectDB();

// Health Check API
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    pod: os.hostname(),
    timestamp: new Date().toISOString()
  });
});

// routes import 
import AuthRoute from './routes/auth.route.js';
import AboutMeRoute from './routes/aboutme.route.js';
import ServiceRoute from './routes/service.route.js';
import SkillRoute from './routes/skill.route.js';
import ProjectRoute from './routes/project.route.js';
import TestimonialRoute from './routes/testimonial.route.js';
import ContactRoute from './routes/contact.route.js';

// use routes 
app.use('/auth', AuthRoute);
app.use('/aboutme', AboutMeRoute);
app.use('/service', ServiceRoute);
app.use('/skill', SkillRoute);
app.use('/project', ProjectRoute);
app.use('/testimonial', TestimonialRoute);
app.use('/contact', ContactRoute);

app.listen(PORT, () => console.log(`Backend Running http://localhost:${PORT}`))
