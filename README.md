
# Employees Management System (EMS)

> [!IMPORTANT]
> Note: This project is currently under development. All the relevant details will be updated as the project progresses.
## 🚀 Project Overview
The Employees Management System (EMS) is a robust, full-stack web application designed to streamline and optimize employee management processes for small- to medium-sized organizations. 
Built on the MERN stack (MongoDB, Express.js, React.js, Node.js), the EMS provides a seamless, user-friendly experience for employees and HR professionals alike.

## Early Screenshots
### EMS Entry Page : 
![EMS Entry]<video width="100%" controls>
  <source src="https://github.com/Devaprakash47/Employee-Management-System-Using-MERN-Stack/blob/6abbe91e6bee49dc9e767d02e1fd8cba24486774/FrontEnd/src/assets/welcome.mp4" type="video/mp4">
</video>

### EMS HR Sign Up : 
![EMS HR-Sign up](https://github.com/user-attachments/assets/3f576691-78fb-4e66-b409-bd9ed9a1eb2c)
### EMS HR Login : 
![EMS HR-login](https://github.com/user-attachments/assets/c9156026-cd16-4423-a7da-ddc2bdad053e)
### EMS HR Dashboard : 
![HR-Dashboard](https://github.com/user-attachments/assets/ca4c14e0-dcfd-41b2-83cd-1ad67a474142)
### EMS HR Employees Page : 
![Employees-Data](https://github.com/user-attachments/assets/b84d5027-1cc2-4083-aa89-770db32a2b39)
### EMS HR Departments Page : 
![Department-Data](https://github.com/user-attachments/assets/30606767-745a-4898-bb44-4dd453a5db24)
### EMS HR Departments Data : 
![Department-Data](https://github.com/user-attachments/assets/b21a4de2-1993-463f-99e2-c699ea07e0ec)
## 🌟 Key Features

### 1. Role-Based Access Control (RBAC)

* Employee Role: Employees can access personalized dashboards to view their attendance, salaries, notices, and other relevant details.

* HR Role: HR professionals can manage employees, approve leaves, issue notices, and oversee recruitment with advanced controls.

### 2. User Authentication & Authorization

* Secure login system using JWT-based authentication.

* Role-based permissions ensure sensitive data and functionalities are accessed only by authorized users.

### 3. Attendance Management

* Real-time tracking of employee attendance with detailed records.

* Customizable attendance reports for HR and management review.

### 4. Leave Management

* Employees can easily apply for leaves via their dashboard.

* HRs can view, approve, or reject leave requests with appropriate justifications.

### 5. Salary Management

* Employees can access detailed breakdowns of their salaries.

* HRs can manage and generate payroll efficiently.

### 6. Dynamic Notifications System

* Employees receive real-time notifications for company updates, salary releases, and approvals.

* Custom notices can be created and sent by HR.

### 7. Email Transactions

* Automated email system for:

* Password recovery.

* Welcome onboarding emails.

* Notifications for leave and attendance updates.

### 8. Corporate Calendar

* Unified calendar to track company holidays, meetings, and important events.

* Employees and HRs can view and manage the corporate calendar efficiently.

### 9. Employee & Department Management

* HRs can manage departments, add or remove employees, and assign roles dynamically.

* Detailed records of employee profiles and departmental insights.

### 10. Recruitment & Interview Insights

* HRs can track recruitment progress and manage candidate pipelines.

* Insights into interview outcomes and potential hires.

## 💡 Problem Solved

The EMS addresses key challenges faced by small to medium-sized organizations, such as:

* Inefficient Employee Management: By automating attendance, leave, and salary management.

* Communication Gaps: Through dynamic notifications and a centralized corporate calendar.

* Security Concerns: By implementing robust RBAC and secure authentication systems.

* Recruitment Bottlenecks: By providing streamlined tools for HRs to manage recruitment workflows.

## 🔧 Tech Stack

* Frontend: React.js, Redux.js, Tailwind CSS, ShadCN UI Library

* Backend: Node.js, Express.js, RESTful APIs

* Database: MongoDB (NoSQL)

* Authentication: JSON Web Tokens (JWT)

* Version Control: Git, GitHub

## 📦 Installation & Setup

Follow these steps to set up the project locally:

Prerequisites:

* Node.js

* MongoDB

* Git

> [!IMPORTANT]
> Note: This project is currently under development. Installation instructions will be updated as the project progresses.
### steps : 

#### 1 Clone the repository : 

```
https://github.com/Darsh-Jogi/Employee-Management-System.git
```

#### 2 Navigate to the project directory : 

```
cd employee-management-system
```

#### 3 Install dependencies :

```
cd client
npm install
```
```
cd server
npm install
```

#### 4 Set up environment variables: 

Create a .env file in the server directory and configure the following :

```
MONGODB_URI = your mongoDB connection URI
appName = your app name
PORT = your port
MAILTRAP_TOKEN = your mailtrap token
JWT_SECRET = your jwt secret
CLIENT_URL = your client URL
```

Create a .env file in the client directory and configure the following :

```
VITE_EMPLOYEE_API= your employee api (backend)
```

#### 5 Start the development server: 

```
cd server
npm run server
```

#### 6 Navigate to the frontend : 

```
cd client
npm run dev
```


## 🚀 Future Enhancements

* Analytics Dashboard: Advanced analytics for HR and management.

* Third-Party Integrations: Integration with tools like Slack and Zoom.


## 🙌 Contributing

We welcome contributions to enhance the EMS! Feel free to fork the repository and submit pull requests.


### Roadmap

Phase 1: Implement core employee features (Dashboard, Attendance, Salary Information).

Phase 2: Develop HR functionalities (Employee Management, Leave Approvals).

Phase 3: Add advanced features like Recruitment and Interview Insights.

Phase 4: Optimize for scalability and deploy a production-ready version.



## 🧑‍💻 Authors & Acknowledgments

Darsh Jogi: Project Lead and Software Engineer

Special Thanks: To all contributors and testers who made this project possible.


## 📄 License

This project is licensed under the MIT License.

## 📬 Contact

For any questions or support, feel free to reach out:

Email: darshjogi001@gmail.com

LinkedIn: [Darsh Jogi](https://www.linkedin.com/in/darsh-jogi-info/).

Thank you for visiting the Employees Management System (EMS) project! We hope it provides valuable insights into how technology can simplify employee management
