# Expenses Tracker

A full-stack web application for tracking personal expenses and categories, built with React frontend and Node.js/Express backend.


## Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Brevo (Sendinblue)** - Email service
- **CORS** - Cross-origin resource sharing


## Setup Instructions

1. **Clone the repository:**
  
2. **Set up backend:**
   ```bash
   cd backend
   npm install
   # Create .env file with your credentials
   npm run dev
   ```

3. **Set up frontend (in a new terminal):**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000


## API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category

### Expenses
- `GET /api/expenses` - Get all expenses (with populated category names)
- `POST /api/expenses` - Create a new expense
- `DELETE /api/expenses/:id` - Delete an expense by ID

### Expense Limit Validation
- Default limit: $1000
- When limit is exceeded, an email notification is sent

## How to Install and Run the Project

### Prerequisites
- Node.js (v14 or higher) 
- MongoDB Atlas account
- Brevo account for email service

## Email Service Setup (Brevo)

### Why Brevo?
I chose Brevo  because:
- **Free tier**: 300 emails/day for free
- **Easy setup**: Simple API integration
- **Reliable**: Enterprise-grade email delivery
- **Good documentation**: Clear API documentation

### Setup Steps:

1. **Create Brevo Account:**
   - Go to [brevo.com](https://www.brevo.com/)
   - Sign up for a free account
   - Verify your email address

2. **Get API Key:**
   - Login to your Brevo dashboard
   - Go to Settings → API Keys
   - Create a new API key
   - Copy the key (starts with `xkeys-`)

3. **Configure in Project:**
   ```bash
   # Add to backend/.env file
   BREVO_API_KEY=xkeys-your-api-key-here
   ```

4. **Email Configuration:**
   - The app sends emails to `mateodoka23@gmail.com` when expense limit is exceeded
   - You can change the recipient email in `backend/services/emailServices.js`

## Key Decisions Made

### 1. **Database Design**
- **Decision**: Used MongoDB with Mongoose ODM
- **Reason**: Flexible schema for expenses and categories, easy to scale
- **Alternative considered**: PostgreSQL 
### 2. **Frontend Architecture**
- **Decision**: Component-based React with separate CSS files
- **Reason**: Better maintainability and reusability
- **Alternative considered**: Single CSS file  

### 3. **API Response Format**
- **Decision**: Use `{ ok: boolean, data: any, error: string }` format
- **Reason**: Easier frontend error handling and consistent UX
- **Alternative considered**: Different response formats per endpoint
  
### 4. **Email Service Integration**
- **Decision**: Brevo over other services  
- **Reason**: Free tier  easier to setup
- **Alternative considered**: Nodemailer with SMTP  


### Time Spent: ~2-4 hours total


## Challenges Faced

### 1. **CORS Configuration**
- **Challenge**: Frontend couldn't connect to backend API
- **Solution**: Added CORS middleware to Express server
- **Learning**: Always configure CORS for cross-origin requests

### 2. **Date Formatting**
- **Challenge**: MongoDB dates displayed as ISO strings
- **Solution**: Created `formatDate` function using `toLocaleDateString`
- **Learning**: Always format dates for better UX

### 3. **Component State Management**
- **Challenge**: Keeping expenses and categories in sync
- **Solution**: Used callback functions to update parent state
- **Learning**: Proper state lifting in React

### 4. **Email Service Integration**
- **Challenge**: Understanding Brevo API documentation
- **Solution**: Used their Node.js SDK and followed examples
- **Learning**: Third-party service integration requires careful documentation reading







