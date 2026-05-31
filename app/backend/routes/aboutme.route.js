import { Router } from "express";
// aboutme routes here
const router = Router();


import { Get, Update } from "../controller/aboutme.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";


router.get('/get', Get);

router.post('/update', AuthMiddleware, Update);

export default router;