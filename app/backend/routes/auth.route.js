import { Router } from "express";
// auth routes here
const router = Router();


import { Login, Verify, Logout } from "../controller/auth.controller.js";



router.post('/login', Login);

router.get('/verify', Verify);

router.post('/logout', Logout);


export default router;