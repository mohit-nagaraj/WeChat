import { Router } from "express";
import { createUser, findOneUser, loginUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.post("/register", createUser );
userRouter.post("/login", loginUser );
userRouter.get("/find/:userId", findOneUser );

export default userRouter;
