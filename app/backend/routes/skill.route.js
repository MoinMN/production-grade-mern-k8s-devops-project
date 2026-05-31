import { Router } from "express";
// skill routes here
const router = Router();

import { Get, Add, Update, Delete, ChangeSequence } from "../controller/skill.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";


router.get('/get', Get);

router.post('/add', AuthMiddleware, Add);

router.post('/update', AuthMiddleware, Update);

router.post('/delete', AuthMiddleware, Delete);

router.post('/change_sequence', AuthMiddleware, ChangeSequence);

export default router;