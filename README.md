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
| React.js  | Node.js, Express | MongoDB (Mongoose) | JWT & Cookies |


## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/employee-management-system.git](https://github.com/Devaprakash47/Employee-Management-System-Using-MERN-Stack.git
```
2. Install dependencies
Backend
```bash
cd backend
npm install
```
Frontend
```bash
cd frontend
npm install
```
4. Environment Configuration
Create a .env file inside the backend folder with the following variables:
```bash
PORT=3001
MONGO_URI=mongodb://localhost:27017/ems
JWT_SECRET=your_jwt_secret_key
```
4. Run the application
Start the backend server
```bash
cd backend
npm start
```
Start the frontend app
```bash

cd frontend
npm run dev
```
📁 Folder Structure
```bash

Employee-Management-System/
│
├── backend/           # Express.js + MongoDB + JWT API
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── .env
│
└── frontend/          # React.js (Vite) Frontend
    ├── components/
    ├── pages/
    └── App.jsx
```
## 📬 Contact

**Devaprakash S**
📧 Email: [deva27997@gmail.com](mailto:deva27997@gmail.com)  
🔗 LinkedIn: [linkedin.com/in/devaprakash47](https://www.linkedin.com/in/devaprakash47)

