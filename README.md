# VIT Canteen Ordering System

🍽️ A complete college canteen ordering system for VIT (Vishwakarma Institute of Technology) with a modern, responsive frontend, Node.js backend, and MongoDB database.

## Features

✅ **Student Portal**
- Sign up/Login restricted to @vit.edu emails only
- Browse menu with filters (Snacks, Meals, Beverages, South Indian, etc.)
- Add items to cart with quantity controls
- Real-time cart total calculation with taxes (5%)
- Payment options: UPI or Cash at counter
- Order tracking with bill generation
- View order history and billing

✅ **Staff Dashboard**
- View all live orders
- Update order status (Pending → Ready → Delivered)
- Real-time order notifications
- Requires special passkey: `VITCARTCANTEEN`

✅ **Owner Dashboard**
- Revenue summary (Today's total)
- Count of paid vs unpaid orders
- Payment method tracking (UPI vs Cash)
- Business analytics
- Same authentication as staff (requires passkey)

✅ **Authentication & Security**
- JWT-based authentication
- Student emails validated against @vit.edu domain
- Staff/Owner protected by special passkey: `VITCARTCANTEEN`
- Secure password hashing with bcrypt
- Protected API endpoints with role-based access

✅ **Payment System**
- UPI Payment option (for online orders)
- Cash at Counter option
- Order status tracking (Paid/Unpaid)
- Automatic bill generation after payment

✅ **Menu Items** (35+ dishes from VIT Canteen)
- South Indian: Dosa, Uttappa, Idli, etc.
- North Indian: Paratha, Chole Bhature, Misal Pav, etc.
- Chinese: Fried Rice, Hakka Noodles, Manchurian, etc.
- Beverages: Tea, Coffee, Cold Coffee, Fresh Lime Soda, etc.
- Snacks: Sandwich, Vada Pav, Samosa, Poha, etc.
- All items include prices from actual VIT canteen

## Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript (Vanilla - No frameworks)
- Responsive design (Mobile & Desktop)
- Single Page Application (SPA)
- localStorage for session management
- Fetch API for backend communication

**Backend:**
- Node.js & Express.js
- MongoDB with Mongoose ODM
- JWT Authentication
- bcrypt for password hashing
- CORS for cross-origin requests

**Database:**
- MongoDB Atlas (Cloud)
- Collections: Users, Orders, MenuItems

## Project Structure

```
vit-canteen-ordering-system/
├── frontend/
│   └── index.html                 # Complete SPA with all HTML, CSS, JS
├── backend/
│   ├── server.js                  # Express server with all routes
│   ├── models/
│   │   ├── User.js                # Student, Staff, Owner schema
│   │   ├── Order.js               # Order schema with items & billing
│   │   └── MenuItem.js            # Menu item schema
│   ├── seedMenu.js                # Script to populate menu items in DB
│   ├── package.json               # Node dependencies
│   └── .env.example               # Environment variables template
├── README.md                      # This file
└── .gitignore                     # Node.js .gitignore
```

## Installation & Setup

### Prerequisites
- Node.js (v14+) and npm
- MongoDB Atlas account (free tier available)
- Git
- Any modern web browser

### Step 1: Clone Repository

```bash
git clone https://github.com/sanyam1805/vit-canteen-ordering-system.git
cd vit-canteen-ordering-system
```

### Step 2: Set up MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/vitcanteen`)
5. Keep this handy for Step 4

### Step 3: Set up Backend

```bash
cd backend
npm install
```

Installed packages:
- express (web server)
- mongoose (MongoDB ORM)
- cors (cross-origin requests)
- bcrypt (password hashing)
- jsonwebtoken (JWT auth)
- dotenv (environment variables)

### Step 4: Configure Environment Variables

Create `.env` file in `backend/` directory:

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/vitcanteen
JWT_SECRET=your_super_secret_jwt_key_here
STAFF_PASSKEY=VITCARTCANTEEN
PORT=5000
```

### Step 5: Seed Menu Items (Optional)

Populate menu items from VIT canteen into MongoDB:

```bash
node seedMenu.js
```

This adds 35+ menu items to your database.

### Step 6: Start Backend Server

```bash
node server.js
```

You should see:
```
Server running on port 5000
MongoDB connected
```

### Step 7: Open Frontend

**Option A: Simple Python HTTP Server**

```bash
cd frontend
python -m http.server 3000
# OR: python -m http.server (defaults to 8000)
```

**Option B: VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

**Option C: npm serve**

```bash
npm install -g serve
serve frontend
```

Then open: `http://localhost:3000` (or wherever you're serving)

## Usage

### For Students

1. **Sign Up:**
   - Click "Student Login" → Sign Up tab
   - Email: Use your @vit.edu email
   - Password: Any password (min 6 chars)
   - Name: Your full name

2. **Browse & Order:**
   - Go to Menu tab
   - Filter by category or view all
   - Click "Add to Cart" on items
   - Adjust quantity using +/- buttons
   - Review cart total (includes 5% tax)

3. **Checkout:**
   - Click "Checkout" button
   - Choose payment method:
     - **UPI:** Enter UPI ID, click "Mark as Paid"
     - **Cash:** Click "Confirm Cash Payment" (you'll pay at counter)
   - View bill with Order ID and breakdown
   - Take screenshot/note Order ID for pickup

### For Staff

1. **Login:**
   - Click "Staff Login" in navbar
   - Fill any email (e.g., staff@vitcanteen.in)
   - Role: Select "Canteen Staff"
   - Passkey: `VITCARTCANTEEN`
   - Click "Login to Dashboard"

2. **Manage Orders:**
   - See all live orders in Staff Order Board
   - View student name, items, total, and current status
   - Update status as orders progress (Pending → Ready → Delivered)

### For Owner

1. **Login:**
   - Click "Staff Login"
   - Role: Select "Canteen Owner"
   - Passkey: `VITCARTCANTEEN`
   - Same login as staff but with owner privileges

2. **View Analytics:**
   - Staff Order Board (all orders)
   - Owner Summary with today's revenue
   - Count of paid orders
   - Payment method breakdown (UPI vs Cash)

## API Endpoints

### Authentication

```
POST /api/auth/student/signup
  Body: {name, email, password}
  Returns: {token, user}

POST /api/auth/student/login
  Body: {email, password}
  Returns: {token, user}

POST /api/auth/staff/login
  Body: {email, password, passkey, role}
  Returns: {token, user}
```

### Menu

```
GET /api/menu
  Returns: [MenuItem, MenuItem, ...]
```

### Orders

```
POST /api/orders
  Header: Authorization: Bearer <token>
  Body: {items, paymentMethod, paid, totals}
  Returns: {order}

GET /api/orders/my
  Header: Authorization: Bearer <token>
  Returns: [Order, ...] (student's own orders)

GET /api/orders
  Header: Authorization: Bearer <token> (staff/owner)
  Returns: [Order, ...] (all orders)

PATCH /api/orders/:id/status
  Header: Authorization: Bearer <token> (staff/owner)
  Body: {status}
  Returns: {order}
```

### Owner Analytics

```
GET /api/owner/summary
  Header: Authorization: Bearer <token> (owner)
  Returns: {revenue, paidCount}
```

## Menu Items (35+ dishes)

### South Indian
- Plain Dosa (₹55), Masala Dosa (₹60), Bombay Dosa (₹65)
- Plain Uttappa (₹55), Tomato Uttappa (₹55), Bombay Uttappa (₹60)
- Idli Chutni Sambar (₹40)

### North Indian
- Paratha: Plain (₹25), Aaloo (₹50), Methi (₹60), Rava (₹60), Palak (₹70), Paneer (₹75), Cheese Corn (₹50)
- Chole Bhature (₹45)
- Pav Bhaji (₹60), Misal Pav (₹60), Bread Butter (₹60)

### Chinese
- Fried Rice (₹80), Schezwan Rice (₹90), Chinese Noodles (₹90)
- Hakka Noodles (₹80), Schezwan Noodles (₹90)
- Manchurian (₹70)

### Snacks & Fast Food
- Vada Pav (₹18), Patties (₹20), Samosa (₹40)
- Sandwiches: Plain (₹20), Chocolate (₹55), Veg Cheese Grill (₹65), Paneer Grill (₹70), Butter Grill (₹35)
- Poha (₹25), Dhokala (₹45), Shabu Vada (₹30), Shev Pav (₹35)

### Beverages
- Tea (₹12), Black Tea (₹15)
- Hot Milk (₹20), Coffee (₹25)
- Cold Coffee (₹50)
- Fresh Lime Soda (₹30), Fresh Juice

## Security Notes

⚠️ **Important for Production:**

1. **Never commit `.env` file** - Always use `.env.example` as template
2. **Change JWT_SECRET** - Use a strong, random secret
3. **Change STAFF_PASSKEY** - Use a secure passkey instead of `VITCARTCANTEEN`
4. **Enable HTTPS** - Use SSL/TLS in production
5. **Validate emails** - Add email verification for @vit.edu accounts
6. **Rate limiting** - Prevent brute force attacks
7. **CORS whitelist** - Restrict to your frontend domain only

## Deployment Options

### Option 1: Heroku (Easy, Free tier ends)
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_connection_string
heroku config:set JWT_SECRET=your_secret
heroku config:set STAFF_PASSKEY=VITCARTCANTEEN
git push heroku main
```

### Option 2: Railway (Recommended, Free tier)
1. Connect GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

### Option 3: Render (Free tier available)
1. Sign up at render.com
2. Create new Web Service
3. Connect GitHub repo
4. Set environment variables
5. Deploy

### Option 4: VPS (AWS, DigitalOcean, Linode)
1. Rent a VPS
2. Install Node.js and MongoDB
3. Clone repository
4. Install dependencies and run
5. Use Nginx as reverse proxy

### Frontend Hosting (Optional)
- GitHub Pages (free static hosting)
- Vercel (free for static sites)
- Netlify (free tier with CI/CD)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support & Questions

If you have questions or encounter issues:

1. Check existing GitHub Issues
2. Create a new Issue with details
3. Include screenshots/error messages
4. Mention your operating system and Node version

## Acknowledgments

- VIT Campus for inspiration
- Menu items sourced from actual VIT canteen
- Built with ❤️ for VIT students

---

**Happy Ordering! 🍽️** 🎓

Made with ❤️ by students for students at VIT
