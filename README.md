# 📦 Parcel Booking System

A **full-stack MERN** parcel management platform that allows users to **book, track, and manage parcel deliveries** efficiently. The system supports **three roles** — Admin, Deliveryman, and User — each with dedicated dashboards and functionalities.

---

## 🚀 Live Links

- **Frontend (Vercel):** [Live Demo](https://percel-frontend.vercel.app/)
- **Backend (Vercel):** [Live API](https://assingmnet-5-percel-booking-system.vercel.app/)

---

## 🧩 Tech Stack

### Frontend:
- **React.js** (with Vite)
- **React Router DOM**
- **Tailwind CSS** + **DaisyUI**
- **React Hook Form + Zod**
- **TanStack Query (React Query)**
- **Axios**
- **Framer Motion** (for animations)

### Backend:
- **Node.js**
- **Express.js**
- **Mongoose**
- **Zod** (schema validation)
- **JWT Authentication**
- **Cors, Cookie Parser, Dotenv**
- **Bcrypt.js** (for password hashing)

### Database:
- **MongoDB (Mongoose ODM)**

### Deployment:
- **Frontend → Vercel**
- **Backend → Vercel**
- **Database → MongoDB Atlas**

---

## 👥 User Roles

| Role | Description | Key Access |
|------|--------------|-------------|
| **Admin** | Manage users, parcels, and deliverymen. | Full access |
| **Deliveryman** | Manage assigned parcels and update delivery status. | Limited access |
| **User (Sender/Receiver)** | Book and track parcels. | Personal access |

---

## 📋 Core Features

### 🧑‍💼 **Admin Panel**
- Manage all **users** (activate, deactivate, assign deliverymen).
- View all **parcels** in the system.
- Access analytics dashboard with **parcel stats**.
- Assign deliverymen manually.
- Monitor real-time delivery status updates.

### 🚚 **Deliveryman Dashboard**
- View **assigned parcels**.
- Update parcel status (e.g., Picked, On the Way, Delivered).
- Access history of completed deliveries.

### 👤 **User Dashboard**
- **Book a Parcel:** enter sender, receiver, parcel type, weight, and delivery date.
- **Track Parcels:** live status tracking.
- **Update Profile:** manage user info.
- View **incoming** and **outgoing parcels** separately.

---

🧠 Project Structure (Backend)
pgsql

backend/
│
├── src/
│   ├── app/
│   │   ├── modules/
│   │   │   ├── user/
│   │   │   ├── parcel/
│   │   │   └── auth/
│   │   ├── utils/
│   │   └── middlewares/
│   ├── config/
│   ├── server.ts
│   └── index.ts
│
└── package.json
📂 Frontend Structure
css
Copy code
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── routes/
│   ├── hooks/
│   ├── utils/
│   └── main.jsx
│
└── package.json
📊 Data Models (Simplified)
User Model
js
Copy code
{
  name: String,
  email: String,
  password: String,
  role: "ADMIN" | "DELIVERYMAN" | "USER",
  phone: String,
  isActive: Boolean
}
Parcel Model
js
Copy code
{
  sender: { userId: ObjectId, name: String },
  receiver: { userId: ObjectId, name: String },
  parcelType: String,
  weight: Number,
  statusLogs: [{ status: String, timestamp: Date }],
  deliveryDate: Date,
  price: Number
}
🧭 API Overview
Method	Endpoint	Description
POST	/auth/register	Register a new user
POST	/auth/login	Login user
GET	/users	Get all users (Admin only)
POST	/parcels	Create new parcel
GET	/parcels/:id	Get parcel by ID
PATCH	/parcels/:id/status	Update parcel status
GET	/parcels/receiver/:id	Get incoming parcels
GET	/parcels/sender/:id	Get outgoing parcels

🧩 Key Functionalities Implemented
✅ JWT-based Authentication
✅ Role-based Access Control (RBAC)
✅ Secure Password Hashing (Bcrypt)
✅ Zod Validation for data integrity
✅ Parcel Tracking with Status Logs
✅ Modular Architecture (Clean Code)
✅ Axios Interceptor with withCredentials
✅ Toast Notifications (React Hot Toast)
