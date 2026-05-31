import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware.js";

// testimonial routes here
const router = Router();

import { Get, Add, Delete, Update, ToggleApprove, SaveVerificationCode, VerifyCode, GetApprove } from "../controller/testimonial.controller.js";

// get all
router.get('/get', AuthMiddleware, Get);
// add email
router.post('/add', AuthMiddleware, Add);
// delete testimonial
router.delete('/delete', AuthMiddleware, Delete);
// toogle approved or reject
router.put('/toggleapprove', AuthMiddleware, ToggleApprove);

// for clients
router.get('/get/approve', GetApprove);
router.put('/send-verification-code', SaveVerificationCode);
router.put('/update', Update);
router.put('/verify', VerifyCode);

export default router;