import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware.js";

// service routes here
const router = Router();

import { Get, Add, Update, Delete, ChangeSequence } from "../controller/service.controller.js";


router.get('/get', Get);

router.post('/add', AuthMiddleware, Add);

router.post('/update', AuthMiddleware, Update);

router.post('/delete', AuthMiddleware, Delete);

router.post('/change_sequence', AuthMiddleware, ChangeSequence);

export default router;