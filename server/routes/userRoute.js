import { Router } from "express";
import { createUser, findAllUsers, findOneUser, loginUser } from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/", findAllUsers);
userRouter.post("/register", createUser );
userRouter.post("/login", loginUser );
userRouter.get("/find/:userId", findOneUser );

export default userRouter;
