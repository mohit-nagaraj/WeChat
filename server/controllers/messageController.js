import { Message } from "../models/messageModel.js";

export const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;
    
    try {
        const data = await Message.create({ chatId, senderId, text });
        res.status(201).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

export const findChatMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await Message.find({ chatId });
        res.status(200).json(messages);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};