import { Router } from "express";
import userRouter from "./user.router.js";
import urlRouter from "./url.router.js";
import rankingRouter from "./ranking.router.js";




const router = Router();
router.use(userRouter)
router.use(urlRouter)
router.use(rankingRouter)

export default router