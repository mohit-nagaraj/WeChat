import { Router } from "express";
import { createChat, findChat, findUserChat } from "../controllers/chatController.js";

const chatRouter = Router();

chatRouter.post("/",createChat);
chatRouter.get("/:userId",findUserChat);
chatRouter.get("/find/:firstId/:secondId",findChat);

export default chatRouter;