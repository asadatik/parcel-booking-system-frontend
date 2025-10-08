# 📦 ParcelPro — Smart Parcel Delivery & Tracking System  

> A full-stack MERN project built with TypeScript that enables users to send, receive, and manage parcels seamlessly with **role-based dashboards** and **JWT-secured authentication**.  

---

## 🚀 Overview  

**ParcelPro** is a smart parcel management system featuring three roles:  
- **Admin** – Manage users, control parcel statuses, view all parcels.  
- **Sender** – Create new parcels, view and manage their own parcels.  
- **Receiver** – View incoming parcels, confirm delivery, and check history.  

All user operations are protected with **JWT authentication**, validated with **Zod**, and structured using a clean, modular architecture.  

---

## 🧩 Core Functionalities  

✅ JWT-based Authentication (Access & Refresh Tokens)  
✅ Role-based Access Control (Admin / Sender / Receiver)  
✅ Secure Password Hashing using **Bcrypt**  
✅ Data Validation with **Zod**  
✅ Parcel Tracking with **Status Logs**  
✅ Modular, Maintainable Code Architecture  
✅ Axios Interceptor with `withCredentials`  
✅ Toast Notifications (React Hot Toast)  
✅ Pagination, Status Badges, and Modern UI Animations  

---

## ⚙️ Tech Stack  

**Frontend:**  
> React + TypeScript + TailwindCSS + ShadCN UI + RTK Query + React Hook Form + Zod + Framer Motion  

**Backend:**  
> Node.js + Express + TypeScript + Mongoose + Zod + JWT + Bcrypt  

**Database:**  
> MongoDB (Cloud via MongoDB Atlas)  

---

## 📁 Project Structure  

### 🧠 Backend
backend/
```
│
├── src/
│ ├── app/
│ │ ├── modules/
│ │ │ ├── auth/
│ │ │ ├── user/
│ │ │ └── parcel/
│ │ ├── middlewares/
│ │ └── utils/
│ ├── config/
│ ├── server.ts
│ └── index.ts
│
└── package.json
```

### 💻 Frontend
```
frontend/
│
├── src/
│ ├── components/
│ ├── pages/
│ ├── layouts/
│ ├── redux/
│ ├── routes/
│ ├── hooks/
│ ├── utils/
│ └── main.tsx
│
└── package.json
```
## 🧠 Role-Based Dashboards  

| Role | Capabilities |
|------|---------------|
| **Admin** | View all parcels, manage users, update parcel status |
| **Sender** | Create parcels, view & cancel own parcels |
| **Receiver** | View incoming parcels, confirm deliveries |

---

## 🔌 API Endpoints  

### Auth  
- `POST /auth/login` → User login  
- `POST /auth/refresh-token` → Refresh JWT  
- `POST /auth/logout` → Logout user  
- `POST /auth/change-password` → Change password  

### Users  
- `PATCH /user/:id` → Update user info  
- `GET /user/all-users` → Get all users (Admin only)  
- `GET /user/all-receiver` → Get all receiver users  

### Parcels  
- `POST /parcel/create` → Create a new parcel  
- `GET /parcel/all` → Get all parcels (Admin)  
- `GET /parcel/my` → Get sender’s parcels  
- `GET /parcel/incoming` → Get receiver’s incoming parcels  
- `PATCH /parcel/:id/status` → Update parcel status (Admin)  
- `PATCH /parcel/:id/cancel` → Cancel parcel (Sender)  

---

🧠 Why This Design
✅ Zod Validation ensures both backend & frontend data integrity
✅ Modular folder structure keeps code maintainable
✅ RTK Query + Axios combo provides full control + caching
✅ ObjectId-based receiver linking ensures robust data relation

🧭 Setup Instructions
Backend
bash
Copy code
cd backend
npm install
cp .env.example .env   # configure DB + JWT_SECRET
npm run dev
Frontend
bash
Copy code
cd frontend
npm install
cp .env.example .env   # set VITE_API_URL
npm run dev
🧰 Future Enhancements
📊 Admin analytics dashboard with charts

🔔 Email notifications on parcel status update

⚡ Real-time status update via WebSocket

🧪 Add test cases with Jest & Supertest

##👨‍💻 Author : 
Asadujjaman Atik
Full Stack Developer | Passionate about clean code & modern web apps


