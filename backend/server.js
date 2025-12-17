require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Order = require('./models/Order');
const MenuItem = require('./models/MenuItem');

const app = express();
app.use(cors());
app.use(express.json());

const STAFF_PASSKEY = process.env.STAFF_PASSKEY || 'VITCARTCANTEEN';

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// JWT Middleware
function auth(requiredRole) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
}

// AUTH ROUTES
app.post('/api/auth/student/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email.endsWith('@vit.edu')) {
    return res.status(400).json({ message: 'Only @vit.edu emails allowed' });
  }
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role: 'student' });
    const token = jwt.sign({ id: user._id, role: 'student' }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ message: 'Signup failed' });
  }
});

app.post('/api/auth/student/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, role: 'student' });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: 'student' }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

app.post('/api/auth/staff/login', async (req, res) => {
  const { email, password, passkey, role } = req.body;
  if (passkey !== STAFF_PASSKEY) {
    return res.status(403).json({ message: 'Invalid staff passkey' });
  }
  let user = await User.findOne({ email, role });
  if (!user) {
    const hash = await bcrypt.hash(password || '123456', 10);
    user = await User.create({ name: role.toUpperCase(), email, password: hash, role });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

// MENU
app.get('/api/menu', async (req, res) => {
  const items = await MenuItem.find({});
  res.json(items);
});

// ORDERS
app.post('/api/orders', auth('student'), async (req, res) => {
  const { items, paymentMethod, paid, totals } = req.body;
  const order = await Order.create({ student: req.user.id, items, paymentMethod, paid, totals, status: paid ? 'Ready' : 'Pending' });
  res.json(order);
});

app.get('/api/orders/my', auth('student'), async (req, res) => {
  const orders = await Order.find({ student: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
});

app.get('/api/orders', auth('staff'), async (req, res) => {
  const orders = await Order.find({}).populate('student', 'name email').sort({ createdAt: -1 });
  res.json(orders);
});

app.patch('/api/orders/:id/status', auth('staff'), async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(order);
});

app.get('/api/owner/summary', auth('owner'), async (req, res) => {
  const paidOrders = await Order.find({ paid: true });
  const revenue = paidOrders.reduce((s, o) => s + (o.totals?.grand || 0), 0);
  res.json({ revenue, paidCount: paidOrders.length });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
