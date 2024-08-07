import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    members: Array,
},{
    timestamps: true
});

export const Chat = model('Chat', chatSchema);