# KrishiBazar - Agricultural Bidding Marketplace

KrishiBazar is a dynamic marketplace platform that bridges the gap between farmers and potential buyers through an innovative bidding system. The platform facilitates direct farmer-to-buyer transactions while maintaining transparency and efficiency in agricultural trade.

## 🌟 Features

### For Farmers
- Post current yields / items or contract for bidding with detailed specifications
- Set bidding parameters (starting bid, start time, end time, quantity)
- Upload product images
- Manage listings (delete/republish after end time)
- Track commission payments (1% platform fee)
- View bidding details and active bidding items

### For Buyers
- Browse available agricultural products
- Place bids on desired items
- Track bidding history and active bids
- View detailed product information including location and specifications

### For Super Admin
- Monitor total platform revenue
- Track user statistics
- Manage bidding items (view/delete)
- Handle commission payment verification
- Process payment status (Approving/Rejecting/Settled/Pending)

## 💻 Tech Stack

- **Frontend**: React
- **Backend**: Node.js, Express js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: Bcrypt js
- **Image Storage**: Cloudinary
- **Email Services**: Nodemailer

## 🚀 Installation and Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/krishibazar.git
cd krishibazar
```

2. Install dependencies for backend
```bash
cd backend
npm install
```

3. Install dependencies for frontend
```bash
cd frontend
npm install
```

4. Create `.env` file in backend directory with following variables
```env
PORT = ""
CLOUDINARY_CLOUD_NAME = ""
CLOUDINARY_API_KEY = ""
CLOUDINARY_API_SECRET = ""
FRONTEND_URL = ""
MONGO_URI = ""
JWT_SECRET_KEY = ""
JWT_EXPIRE_IN = ""
COOKIE_EXPIRE = ""
SMTP_HOST = ""
SMTP_SERVICE = ""
SMTP_PORT = ""
SMTP_MAIL = ""
SMTP_PASSWORD = "" 
```

5. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server in a new terminal
cd frontend
npm start
```

## 🌐 API Endpoints

### Authentication
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/logout` - User logout
- `GET /api/v1/user/profile` - User Profile

### Bidding Item
- `POST /api/v1/biddingitem/create` - Create new bidding item
- `GET /api/v1/biddingitem/allitems` - Get all active items
- `GET /api/v1/biddingitem/myitems` - Get my items
- `GET /api/v1/biddingitem/item/:id` - Get item details
- `DELETE /api/v1/biddingitem/delete/:id` - Delete bidding item
- `PUT /api/v1/biddingitem/item/republish/:id` - Delete bidding item

### Bid 
- `POST /api/v1/bid/placebid/:id` - Place bid

### Commission 
- `POST /api/v1/commission/proof` - Get proof of Commission

### SuperAdmin 
- `DELETE /api/v1/superadmin/biddingitem/delete/:id` - Delete bidding item
- `GET /api/v1/superadmin/paymentproofs/getall` - Get all payment proofs
- `PUT /api/v1/superadmin/paymentproof/status/update/:id` - Update proof status
- `DELETE /api/v1/superadmin/paymentproof/delete/:id` - Delete payment proof
- `GET /api/v1/superadmin/users/getall` - Get all users
- `GET /api/v1/superadmin/monthlyrevenue` - Get monthly revenue 

## 💼 Business Logic

1. **Commission System**
   - 1% platform fee on successful bids
   - Automatic commission tracking
   - Payment verification by admin
   - Bidding restrictions on unpaid commission

2. **Bidding Process**
   - Real-time bid tracking
   - Automatic bid closure at end time
   - Republishing option after bid end
   - Transparent bid history

3. **Admin Controls**
   - Revenue monitoring
   - User management
   - Content moderation
   - Payment verification system

## 👥 Contributing

We welcome contributions to KrishiBazar! Please read our contributing guidelines before submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
