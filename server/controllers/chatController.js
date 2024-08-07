import { Chat } from "../models/chatModel.js";

export const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) return res.status(200).json(chat);
    const data = await Chat.create({ members: [firstId, secondId] });
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const findUserChat = async (req, res) => {
  const { userId } = req.params;
  try {
    const chats = await Chat.find({ members: { $in: [userId] } });
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });
    return res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}