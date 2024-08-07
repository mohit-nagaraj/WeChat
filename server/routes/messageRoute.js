import { Router } from "express";
import { createMessage, findChatMessages } from "../controllers/messageController.js";

const messageRouter = Router();

messageRouter.post("/",createMessage)
messageRouter.get("/:chatId",findChatMessages)

export default messageRouter;