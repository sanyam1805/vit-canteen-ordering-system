# Complete Code Implementation Guide for VIT Canteen Ordering System

This guide provides all the code snippets needed to build the complete VIT Canteen Ordering System.

## Step 1: Frontend Code

Create `frontend/index.html` with complete code from Perplexity:
https://www.perplexity.ai/search/this-are-some-images-suggestio-.HHvpsE.SKucLBtEYp6HUQ

**Key Sections in index.html:**
- HTML structure with all sections (hero, menu, auth, payment, dashboards)
- CSS styling with variables, responsive design, and component styles
- JavaScript SPA logic with:
  - Navigation between sections
  - Cart management
  - Student authentication (restricted to @vit.edu)
  - Staff/Owner login with passkey `VITCARTCANTEEN`
  - Payment processing
  - Bill generation
  - Dashboard data loading

## Step 2: Backend Setup

### Create .env file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vitcanteen
JWT_SECRET=your_super_secret_jwt_key
STAFF_PASSKEY=VITCARTCANTEEN
PORT=5000
```

### Create backend/models/User.js
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'staff', 'owner'], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
```

### Create backend/models/Order.js
```javascript
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        name: String,
        qty: Number,
        price: Number
      }
    ],
    paymentMethod: { type: String, enum: ['upi', 'cash'] },
    paid: { type: Boolean, default: false },
    totals: {
      subtotal: Number,
      tax: Number,
      grand: Number
    },
    status: { type: String, enum: ['Pending', 'Ready', 'Delivered'], default: 'Pending' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
```

### Create backend/models/MenuItem.js
```javascript
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    veg: Boolean,
    description: String,
    imageUrl: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);
```

## Step 3: Server Setup

Create backend/server.js with Express routes - get from Perplexity documentation.

**Key Routes:**
- POST /api/auth/student/signup
- POST /api/auth/student/login
- POST /api/auth/staff/login (with passkey validation)
- GET /api/menu
- POST /api/orders (student creating order)
- GET /api/orders (staff seeing all orders)
- GET /api/orders/my (student's orders)
- PATCH /api/orders/:id/status (staff updating status)
- GET /api/owner/summary (owner analytics)

## Step 4: Frontend API Integration

The frontend index.html already includes fetch calls to:
- `http://localhost:5000/api/auth/student/signup`
- `http://localhost:5000/api/auth/student/login`
- `http://localhost:5000/api/auth/staff/login`
- `http://localhost:5000/api/orders`
- `http://localhost:5000/api/owner/summary`

## Step 5: Menu Items (35+)

All 35+ menu items with actual VIT canteen prices are defined in frontend index.html and can be seeded to MongoDB.

Categories include:
- South Indian
- North Indian
- Chinese
- Beverages
- Snacks

## Getting All Code

1. **Frontend Complete Code:** Copy entire index.html from the Perplexity conversation
2. **Backend Complete Code:** Copy server.js from Perplexity documentation
3. **Models:** Create the 3 model files above
4. **Dependencies:** Run `npm install` in backend folder
5. **Environment:** Create .env file with credentials

## Running the System

```bash
# Terminal 1: Start Backend
cd backend
npm install
node server.js

# Terminal 2: Start Frontend
cd frontend
python -m http.server 3000
# OR use VS Code Live Server

# Open: http://localhost:3000 or http://localhost:8000
```

## Testing

**Student:**
- Email: student@vit.edu
- Password: test123

**Staff:**
- Email: staff@vitcanteen.in
- Passkey: VITCARTCANTEEN

**Owner:**
- Email: owner@vitcanteen.in
- Passkey: VITCARTCANTEEN

## Source

All code snippets are from the comprehensive Perplexity documentation already created.
Refer to that for complete, detailed implementations of all files.
