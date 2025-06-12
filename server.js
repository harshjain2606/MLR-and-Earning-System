const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Enable CORS for frontend URL
app.use(cors({
  origin: 'http://127.0.0.1:5500',  // Allow requests from your frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Middleware to parse incoming request body as JSON
app.use(express.json()); // THIS IS IMPORTANT TO FIX THE "undefined" ERROR

// Mock Database (for simplicity)
let users = {
  1: { id: 1, parentId: null, referrals: [2, 3], balance: 0 },
  2: { id: 2, parentId: 1, referrals: [4, 5], balance: 0 },
  3: { id: 3, parentId: 1, referrals: [6, 7], balance: 0 },
  // Add more users here as needed
};

// Handle purchases and distribute earnings
app.post('/purchase', (req, res) => {
  const { purchaseAmount, buyerId } = req.body;

  // Validate purchase amount
  if (purchaseAmount < 1000) {
    return res.status(400).json({ message: 'Purchase amount should be above 1000 Rs' });
  }

  // Retrieve buyer and parent user data
  const buyer = users[buyerId];
  if (!buyer) {
    return res.status(404).json({ message: 'Buyer not found' });
  }

  const parentUser = users[buyer.parentId];
  if (!parentUser) {
    return res.status(404).json({ message: 'Parent user not found' });
  }

  // Calculate earnings
  const level1Earnings = purchaseAmount * 0.05; // 5% for direct referrals (Level 1)
  const level2Earnings = purchaseAmount * 0.01; // 1% for indirect referrals (Level 2)

  // Update parent user balances
  parentUser.balance += level1Earnings;

  // Update for indirect referrals (Level 2)
  if (buyer.parentId) {
    const secondLevelUser = users[buyer.parentId];
    if (secondLevelUser) {
      secondLevelUser.balance += level2Earnings;
    }
  }

  // Emit real-time update via Socket.IO to notify the frontend
  io.emit('earningsUpdated', {
    userId: parentUser.id,
    referralId: buyerId,
    level1Amount: level1Earnings,
    level2Amount: level2Earnings,
    purchaseAmount: purchaseAmount
  });

  // Log the details in the server console (backend log)
  console.log(`Purchase successful for Buyer ID: ${buyerId}`);
  console.log(`User ${parentUser.id} earned Rs ${level1Earnings} from referral ${buyerId}.`);
  console.log(`Level 2 earnings: Rs ${level2Earnings}`);

  // Send a proper JSON response with a detailed message
  res.status(200).json({
    message: 'Purchase successful',
    level1Earnings,
    level2Earnings,
    totalEarnings: level1Earnings + level2Earnings,
    purchaseAmount
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
