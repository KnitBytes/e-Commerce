const express = require('express');
const app = express();
const http = require('http'); // ⬅️ Needed for wrapping Express
const socketIO = require('socket.io');

const locationRoutes = require('./routes/locationRoutes');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const errorHandler = require('./middlewares/errorMiddleware');
const cartRoutes = require("./routes/cartRoute");
const ordersRoute = require("./routes/ordersRoute");
const reviewRoutes = require('./routes/reviewRoute');
const adminDashboardRoute = require("./routes/adminDashboardRoute");
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const trendingRoutes = require('./routes/trendingRoute');
app.use(express.json());


const server = http.createServer(app); // ⬅️ Wrap express in HTTP server
const io = socketIO(server, {
  cors: {
    origin: '*', // or use your frontend URL
    methods: ['GET', 'POST', 'PUT']
  }
});

// 🧠 Attach io to app so you can use it later (like in controllers/services)
app.set('io', io);

// ✅ Socket.IO connection logic
io.on('connection', (socket) => {
  console.log('🟢 Socket connected:', socket.id);

  socket.on('join', ({ userId, role }) => {
    if (role === 'admin') {
      socket.join('admins'); // Admins join shared channel
    } else {
      socket.join(`user_${userId}`); // Users get private room
    }
    console.log(`👤 ${role} joined room:`, role === 'admin' ? 'admins' : `user_${userId}`);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Socket disconnected:', socket.id);
  });
});


app.use('/api', locationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/products", require("./routes/productRoutes"));
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoute);
app.use('/api/reviews', reviewRoutes);
app.use("/api/admin/dashboard", adminDashboardRoute);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api', trendingRoutes);


// Centralized error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
