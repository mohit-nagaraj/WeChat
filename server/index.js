import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import userRouter from "./routes/userRoute.js";
import logger from "./logger.js";
import chatRouter from "./routes/chatRoute.js";
import messageRouter from "./routes/messageRoute.js";
import authenticateToken from "./utils/verify.js";
import https from "https";
import fs from "fs";

// Read the SSL certificate and key
const privateKey = fs.readFileSync("ssl/server.key", "utf8");
const certificate = fs.readFileSync("ssl/server.cert", "utf8");

const credentials = { key: privateKey, cert: certificate };

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get("/health", (req, res) => {
  res.status(200).send("Server is running");
});

app.use("/api/users", userRouter);

//verify token: only below routes are protected
app.use(authenticateToken);

app.use("/api/chats", chatRouter);
app.use("/api/messages", messageRouter);

// Create HTTPS server with the credentials
https.createServer(credentials, app).listen(443, () => {
  console.log("HTTPS Server running on port 443");
});
