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

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/employee-management-system.git
cd employee-management-system
2. Install dependencies
Backend
bash
Copy
Edit
cd server
npm install
Frontend
bash
Copy
Edit
cd client
npm install
3. Create .env file in /server with:
env
Copy
Edit
PORT=3001
MONGO_URI=mongodb://localhost:27017/ems
JWT_SECRET=your_jwt_secret_key
4. Run the app
Start backend
bash
Copy
Edit
cd server
npm start
Start frontend
bash
Copy
Edit
cd client
npm start
📸 Screenshots
Admin Dashboard	Employee Dashboard

📌 To Do
Add email notifications for approved/rejected leaves

Integrate PDF salary slips

Improve UI with Tailwind/Bootstrap

👨‍🔧 Author
Devaprakash S
Email: devaprakash@example.com
LinkedIn: linkedin.com/in/devaprakash47
