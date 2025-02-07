const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Schemas
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

// const messageSchema = new mongoose.Schema(
//   {
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     recipient: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     content: { type: String, required: true },
//     timestamp: { type: Date, default: Date.now },
//   },
//   { collection: "messages" }
// );

const TransactionSchema = new mongoose.Schema(
  {
    token_id: { type: String, required: true },
    amount: { type: Number, required: true },
    grid_id: { type: String, required: true },
    buyer_email: { type: String, required: true },
  },
  { collection: "transactions" }
);

const Transaction = mongoose.model("transactions", TransactionSchema);

app.get("/api/getTransactions", async (req, res) => {
  try {
    const transactions = await Transaction.find({});
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
});

app.post("/api/pushTransaction", async (req, res) => {
  try {
    const { token_id, amount, grid_id, buyer_email } = req.body;

    // Create new user
    const transaction = new Transaction({
      token_id,
      amount,
      grid_id,
      buyer_email,
    });

    await transaction.save();

    res.status(201).json({
      message: "Transaction created successfully",
    });
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({
      message: "Error creating Transaction",
      error: error.response.data,
    });
  }
});

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { collection: "messages" }
);

const Message = mongoose.model("Message", messageSchema);

// Store connected users globally
const connectedUsers = new Map();

// Socket.IO Connection Handler
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("authenticate", async (data) => {
    console.log("User authenticated:", data.userId);
    connectedUsers.set(data.userId, socket.id);
  });

  socket.on("send_private_message", async (messageData) => {
    try {
      // Create and save the message
      const message = new Message({
        sender: messageData.senderId,
        recipient: messageData.recipientId,
        content: messageData.content,
        timestamp: new Date(),
      });

      await message.save();

      // Prepare the message data for sending
      const messageToSend = {
        _id: message._id,
        senderId: message.sender.toString(),
        recipientId: message.recipient.toString(),
        content: message.content,
        timestamp: message.timestamp,
      };

      // Send to recipient if online
      const recipientSocketId = connectedUsers.get(messageData.recipientId);
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receive_message", messageToSend);
      }

      // Send back to sender for confirmation
      const senderSocketId = connectedUsers.get(messageData.senderId);
      if (senderSocketId) {
        io.to(senderSocketId).emit("message_sent", messageToSend);
      }
    } catch (error) {
      console.error("Error handling private message:", error);
      socket.emit("message_error", { error: "Failed to send message" });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // Remove user from connected users
    for (let [userId, socketId] of connectedUsers.entries()) {
      if (socketId === socket.id) {
        connectedUsers.delete(userId);
        break;
      }
    }
  });
});

app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login successful",
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// Routes
app.get("/api/find-user", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email }).select("_id username email");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Find user error:", error);
    res
      .status(500)
      .json({ message: "Error finding user", error: error.response.data });
  }
});

app.get("/api/recent-chats", async (req, res) => {
  try {
    const { userId } = req.query;

    const recentMessages = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: new mongoose.Types.ObjectId(userId) },
            { recipient: new mongoose.Types.ObjectId(userId) },
          ],
        },
      },
      {
        $sort: { timestamp: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", new mongoose.Types.ObjectId(userId)] },
              "$recipient",
              "$sender",
            ],
          },
          lastMessage: { $first: "$content" },
          timestamp: { $first: "$timestamp" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          _id: "$userDetails._id",
          username: "$userDetails.username",
          lastMessage: 1,
          timestamp: 1,
        },
      },
    ]);

    res.json(recentMessages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching recent chats", error: error.message });
  }
});

app.get("/api/chat-history", async (req, res) => {
  try {
    const { userId, recipientId } = req.query;

    const messages = await Message.find({
      $or: [
        { sender: userId, recipient: recipientId },
        { sender: recipientId, recipient: userId },
      ],
    })
      .sort({ timestamp: 1 })
      .lean();

    const formattedMessages = messages.map((msg) => ({
      _id: msg._id,
      senderId: msg.sender.toString(),
      recipientId: msg.recipient.toString(),
      content: msg.content,
      timestamp: msg.timestamp,
      isSelf: msg.sender.toString() === userId,
    }));

    res.json(formattedMessages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching chat history", error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
