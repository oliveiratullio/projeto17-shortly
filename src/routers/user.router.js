import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/user.schemas.js";
import { validateSignIn, validateSignUp } from "../middlewares/user.middleware.js";

const userRouter = Router()
userRouter.post("/signup", validateSchema(signUpSchema), validateSignUp, signUp)
userRouter.post("/signin", validateSchema(signInSchema), validateSignIn, signIn)

export default userRouter