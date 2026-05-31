import { Router } from "express";
// contact routes here
const router = Router();


import { Get, Delete, Add } from "../controller/contact.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";


router.get('/get', AuthMiddleware, Get);

router.post('/delete', AuthMiddleware, Delete);

router.post('/add', Add);


export default router;