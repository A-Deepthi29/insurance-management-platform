# 🛡 Insurance Management Platform

A full-stack web application developed to simplify insurance operations such as customer management, policy management, premium tracking, claim processing, document management, and report generation.

---

# 📌 Project Overview

The Insurance Management Platform provides a centralized system for managing insurance-related operations. It includes secure authentication, role-based authorization, CRUD operations for multiple modules, reporting, and a responsive user interface.

---

# 🚀 Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Password Encryption using bcrypt
- Secure Logout

---

### 👥 Customer Management

- Add Customer
- View Customers
- Update Customer
- Delete Customer
- Search Customers
- Pagination

---

### 📄 Policy Management

- Create Policy
- View Policies
- Update Policy
- Delete Policy
- Policy Search

---

### 💳 Premium Management

- Add Premium Payment
- View Premium Payments
- Update Premium
- Delete Premium

---

### 📋 Claim Management

- Create Claim
- View Claims
- Update Claim
- Delete Claim

---

### 📁 Document Management

- Upload Documents
- View Documents
- Delete Documents

---

### 📊 Reports Dashboard

- Total Customers
- Total Policies
- Premium Statistics
- Claims Statistics

---

### 🔒 Role-Based Authorization

#### Administrator

- Full access to all modules

#### Insurance Agent

- Customer Management (Create, View, Update)
- Policy Management (Create, View, Update)
- Premium Management (Create, View, Update)
- Claim Management (Create, View, Update)
- Document Upload & View
- Reports Access

#### Customer

- Limited access

---

# 🛠 Tech Stack

## Frontend

- React 19
- React Router DOM
- Bootstrap 5
- Axios
- React Toastify

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL

## ORM

- Prisma ORM

## Authentication

- JWT (JSON Web Token)
- bcryptjs

---

# 📂 Project Structure

```
InsuranceManagementPlatform

│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── prisma
│   ├── routes
│   ├── uploads
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

```bash
cd server

npm install

npx prisma generate

npx prisma db push

npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
DATABASE_URL=postgresql://username:password@localhost:5432/insurance_db

JWT_SECRET=your_secret_key

PORT=5000
```

---

# 👤 Default Roles

- Administrator
- Insurance Agent
- Customer

---

# 🔐 Authentication Flow

1. User registers.
2. Password is encrypted using bcrypt.
3. User logs in.
4. JWT token is generated.
5. Token is stored in Local Storage.
6. Protected routes use JWT Authentication.
7. Role Middleware authorizes access.

---

# 📱 Responsive Design

The application is responsive and supports:

- Desktop
- Tablet
- Mobile Devices

---

# 🧪 Validation & Error Handling

- Required field validation
- Email validation
- Duplicate record validation
- JWT authentication validation
- Role authorization validation
- Server-side error handling
- User-friendly error messages

---

# 📸 Modules

- Dashboard
- Customer Management
- Policy Management
- Premium Tracking
- Claim Management
- Document Management
- Reports

---

# 📈 Future Enhancements

- Email Notifications
- SMS Notifications
- Online Premium Payment
- Policy Renewal Alerts
- Customer Portal
- Advanced Analytics Dashboard
- Cloud File Storage

---

# 👨‍💻 Author

**Bhavana Aavula**

B.Tech - Electronics and Communication Engineering (ECE)

---

# 📄 License

This project is developed for learning and academic purposes.