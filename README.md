# 🏠 HomeEase - Service Providing Platform 🛠️

Welcome to **HomeEase**! 🎉 This is a MERN stack project built to connect users with skilled workers for home services like carpentry, plumbing, moving, and more. 🛠️✨ The platform allows users to find workers in their city, book services, and leave reviews. Workers can showcase their skills, experience, and availability. 🌟

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [How to Run the Project Locally](#how-to-run-the-project-locally)
- [How to Deploy to Render.com](#how-to-deploy-to-rendercom)
- [Features](#features)
- [Screenshots](#screenshots)

## Technologies Used

- **Frontend**:
  - ⚡ Vite + React + TypeScript
  - 🎨 Tailwind CSS
- **Backend**:
  - 🛠️ Express.js + Node.js
  - 🗄️ MongoDB (for database)
  - 🔐 JWT (for authentication)
- **Deployment**:
  - ☁️ Render.com (for both frontend and backend)

## Project Structure

```plaintext
HomeEase/
├── frontend/              # Frontend (Vite + React + TypeScript + Tailwind CSS)
│   ├── public/            # Static assets
│   ├── src/               # React components and pages
│   ├── tailwind.config.js # Tailwind CSS configuration
│   └── vite.config.ts     # Vite configuration
│
├── backend/               # Backend (Express.js + Node.js + MongoDB)
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   └── server.js          # Entry point for the backend
│
├── .env.example           # Environment variables template
├── .gitignore             # Files to ignore in Git
├── README.md              # You're here! 😄
└── package.json           # Node.js dependencies and scripts
```

## How to Run the Project Locally

### Prerequisites

- Node.js (v16 or higher) 📦
- MongoDB (local or cloud) 🗄️
- Git (optional) 🐙

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/HomeEase.git
   cd HomeEase
   ```

   - OR simply download code as zip and extract it.

2. **Set Up Environment Variables**:

   - Create a .env file in the `backend` folder.
   - Heres the format:

   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. **Install Dependencies**:
   - for frontend:
   ```bash
   cd frontend
   npm install
   ```
   - for backend:
   ```bash
   cd backend
   npm install
   ```
4. **Run the Backend**:
   ```bash
   cd backend
   node server.js
   ```
5. **Run the Frontend**:
   ```bash
   cd Frontend
   npm run dev
   ```
6. **Open in Browser**:
   - Go to `http://localhost:5173/` in browser to see the Website.

## How to Deploy to Render.com

For detailed deployment instructions, check out the [Deployment Guide](DEPLOY_GUIDE.md).

## Features

- **User Authentication**: 🔐 Secure login and registration for users and workers.
- **Service Search**: 🔍 Find workers by service type and city.
- **Booking System**: 📅 Book services and track their status.
- **Reviews and Ratings**: ⭐ Rate and review workers after service completion.
- **Responsive Design**: 📱 Works seamlessly on all devices.

## Screenshots

Here are some screenshots of the **HomeEase** platform:

### Home Page

![Home Page](https://github.com/user-attachments/assets/6f77361f-be8d-4bf1-83d1-9e9c848df921)

### Services Page

![Services Page](https://github.com/user-attachments/assets/a63be831-32c2-4ffa-baca-f7488cf47560)

### Worker Profile Page

![Worker Profile Page](https://github.com/user-attachments/assets/f1990c2b-5ac5-4f7e-8680-024d75c9b357)

### Service Details Page

![Service Details Page](https://github.com/user-attachments/assets/fd89a32b-b6a4-46fe-be7b-b3c8b5bf5d91)

### User Dashboard Page

![User Dashboard Page](https://github.com/user-attachments/assets/544cc69e-8f4c-4aa3-a484-46789a55485b)

---

Enjoy building and using HomeEase! 🎉 If you have any questions or suggestions, feel free to open an issue or reach out ✨
