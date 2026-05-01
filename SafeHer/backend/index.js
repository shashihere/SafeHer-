const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const analyzeRoutes = require('./routes/analyzeRoutes');
const forumRoutes = require('./routes/forumRoutes');

const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // allow frontend access
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/analyze', analyzeRoutes);
app.use('/api/forum', forumRoutes);

// Socket.io Real-Time Tracking Engine
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Join a specific room based on User ID
    socket.on("join_room", (userId) => {
        socket.join(userId);
        console.log(`User with Socket ID: ${socket.id} joined room: ${userId}`);
    });

    // Victim streams live location to their room
    socket.on("send_sos_location", (data) => {
        // data should contain { userId, lat, lng, timestamp }
        socket.to(data.userId).emit("receive_sos_location", data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected to SafeHer Database'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`SafeHer Backend running on port ${PORT}`);
});
