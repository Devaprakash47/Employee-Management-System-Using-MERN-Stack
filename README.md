# 🧑‍💼 Employee Management System (EMS)

A full-featured **Employee Management System** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). This system enables administrators to manage employee data, leave requests, roles, and payroll, while employees can view their profiles and request leaves.

## 🚀 Features

### 👨‍💼 Admin Dashboard
- Add, edit, delete employee records
- Search and filter employees by multiple criteria
- View and manage leave requests
- Secure role-based access (Admin only)

### 👨‍💻 Employee Dashboard
- View personal profile and employment details
- Request leave with status tracking
- View total leaves, taken leaves, and remaining leaves
- Protected session-based login with JWT

## 🛠️ Tech Stack

| Frontend        | Backend         | Database        | Authentication |
|-----------------|------------------|------------------|------------------|
| React.js (Hooks) | Node.js, Express | MongoDB (Mongoose) | JWT & Cookies |

## 📁 Folder Structure

├── client/ # React frontend
│ ├── components/
│ └── pages/
├── server/ # Express backend
│ ├── models/
│ ├── routes/
│ └── controllers/
└── README.md

bash
Copy
Edit

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/employee-management-system.git
cd employee-management-system
```
2. Install dependencies
Backend
bash
Copy
Edit
cd backend
npm install
Frontend
bash
Copy
Edit
cd frontend
npm install
3. Environment Configuration
Create a .env file inside the backend folder with the following variables:

env
Copy
Edit
PORT=3001
MONGO_URI=mongodb://localhost:27017/ems
JWT_SECRET=your_jwt_secret_key
4. Run the application
Start the backend server
bash
Copy
Edit
cd backend
npm start
Start the frontend app
bash
Copy
Edit
cd frontend
npm start
