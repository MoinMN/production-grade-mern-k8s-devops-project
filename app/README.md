# MERN Stack Portfolio Website

## 🚀 Overview

This is a **dynamic portfolio website** built using the **MERN Stack (MongoDB, Express, React, Node.js)**. It features an admin panel for managing content, sections for About Me, Services, Projects, Skills, Contact, and Client Testimonials. Additionally, it includes a **secure testimonial submission system** with OTP verification and an automated contact email system.

---

## 📌 Features

### 🔹 **Public Features**

- **About Me** - Dynamic information about the developer.
- **Services** - List of services provided.
- **Projects** - Showcasing projects with descriptions and links.
- **Skills** - Technologies and skills used by the developer.
- **Contact Page** - Users can send a message, and the developer will receive an email notification.
- **Client Testimonials** - Display client feedback dynamically.
- **Submit Testimonial** - A secure route (`/post-testimonial`) where clients can submit testimonials **only if authorized**.
- **3D PC Model** - A **realistic PC model rendered using Three.js**.

### 🔹 **Admin Features** (`/admin`)

- Admin login (Created manually in the database for security; no API available for account creation).
- Manage and update dynamic data (About, Services, Projects, Skills, Contact Page, and Testimonials).
- Review and approve testimonials before allowing clients to post.

### 🔹 **Testimonial Submission Flow** (`/post-testimonial`)

1. The user enters their email.
2. The backend verifies if the admin has allowed them to post a testimonial.
3. If approved, an **OTP is sent via Nodemailer**.
4. The user enters the OTP and submits their testimonial.

### 🔹 **Automated Contact Form**

- When someone sends a message via the contact form, an **email is sent to the developer**.

---

## 🛠️ Tech Stack

### 🔹 **Frontend**

- React.js (Vite)
- Tailwind CSS
- ShadCN UI Components (Modern UI)
- Framer Motion (Animations)
- Three.js (3D Model Rendering)
- React Router DOM
- React Icons & FontAwesome
- Axios
- Bootstrap

### 🔹 **Backend**

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Cloudinary (For image uploads)
- Nodemailer (For OTP & Contact Emails)

---

## 💽 Project Structure

### 🔹 **Backend Folder Structure**

```
backend/
├── models/       # Mongoose Models
├── routes/       # API Routes
├── controllers/  # Business Logic
├── middleware/   # Authentication & Security
├── template      # For Email HTML Templates
├── config/       # Database & Environment Configs
├── utils/        # Helper Functions
├── .env          # Environment Variables
└── index.js      # Main Express Server
```

### 🔹 **Frontend Folder Structure**

```
frontend/
├── src/
│   ├── components/      # Reusable UI Components
│   ├── pages/           # React Pages
│   ├── api/             # Axios API Calls
│   ├── assets/          # Static Assets
│   ├── config/          # Configuration Files
│   │   └── BackendURL.jsx # Backend API URL
│   ├── App.jsx          # Main App Component
│   ├── index.js         # Entry Point
│   ├── styles/          # Tailwind Styles
│   ├── router/          # React Router Setup
└── .env                 # Environment Variables
```

---

## 🔧 Setup Instructions

### 📌 **1. Clone the Repository**

```bash
git clone https://github.com/MoinMN/portfolio.git
cd portfolio
```

### 📌 **2. Backend Setup**

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` and add the following:

```env
PORT='4518'
FRONTEND_URL='http://localhost:5173'

# Developer Email
DEV_EMAIL='your-email@example.com'

# Default Client Profile Image
DEFAULT_CLIENT_IMG_SRC='/src/assets/default-client-profile.jpg'

# Database Connection
MONGO_URL='your-mongodb-url'

# JWT Secret Key
JWT_SECRET_KEY='your-secret-key'

# Nodemailer Configuration
EMAIL_ADDRESS='your-email@example.com'
EMAIL_PASSCODE='your-email-password'

# Cloudinary API Credentials
CLOUDINARY_CLOUD_NAME='your-cloudinary-name'
CLOUDINARY_API_KEY='your-cloudinary-key'
CLOUDINARY_API_SECRET='your-cloudinary-secret'
```

Run the backend server:

```bash
npm start
```

### 📌 **3. Frontend Setup**

```bash
cd frontend
npm install
```

Update the API base URL in `src/config/BackendURL.jsx`:

```js
const BASE_URL = 'http://localhost:4518';
export default BASE_URL;
```

Run the frontend server:

```bash
npm run dev
```

---

## 🔒 Security Measures

- **Admin Login**: Created manually in the database; no API for admin registration.
- **OTP Verification**: Prevents unauthorized testimonials.
- **JWT Authentication**: Protects API routes.
- **CORS Handling**: Secure backend API requests.
- **Cloudinary Integration**: Secure image storage.
- **ShadCN UI Components**: Improved UI security and performance.

---

## 🌟 Contribution & Feedback

Feel free to open issues or contribute by creating a pull request. Your feedback is appreciated!

### **Developer Contact**

💎 Email: moinnaik98@gmail.com

💛 If you like this project, don't forget to give it a star on GitHub! ⭐