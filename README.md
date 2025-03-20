# DriveEase - Car Rental Web Application

A full-stack car rental web application built with **HTML**, **CSS**, **JavaScript**, **Node.js**, **jQuery**, **Express.js**, and **PostgreSQL**.  
This project allows users to rent cars, manage their accounts, reset passwords, and contact the service team via a responsive and user-friendly interface.

---

## 🌐 Tech Stack
- **Frontend**: HTML, CSS, JavaScript, jQuery
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL

---

## 📄 Features
✅ **User Authentication**
- Signup / Login / Logout  
- Password Reset Functionality  

✅ **Pages**
- Home  
- Rent Car  
- About Us  
- Contact Us  
- Login / Logout / Signup  
- Reset Password  

✅ **Session Management**
- Secure sessions using `express-session`  

✅ **Password Security**
- Password hashing with `bcrypt`  

✅ **Email Notifications**
- Contact form integrated with `nodemailer` to send emails  

✅ **Responsive UI**
- Modern and clean interface using CSS and jQuery  

---

## 🛠️ NPM Packages Used
```javascript
const express = require('express');
const path = require('path');
const session = require('express-session');
const pool = require('./db');            // PostgreSQL connection
const bcrypt = require('bcrypt');        // Password hashing
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
```

---

## 🗂️ Folder Structure
```
/view
  ├── login.html
  ├── signup.html
  ├── reset_password.html
  ├── index.html
  ├── about_us.html
  ├── contact_page.html
  ├── rent_car.html

/public
  ├── styles/
  ├── images/

/ (root)
  ├── index.js        // Express server
  ├── db.js           // PostgreSQL pool setup
  ├── .env
  ├── package.json
  ├── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/DriveEase.git
cd DriveEase
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```
PORT=3000
SESSION_SECRET=your_secret_key
DATABASE_URL=your_postgresql_connection_string
```

### 4. Start the Server
```bash
node index.js
```

### 5. Access the Application
Visit `http://localhost:3000` in your browser.

---

## 📬 Contact
For any queries or support:  
📧 samplecoding77@gmail.com  

---

## ✅ Status
🚀 Project under active development  
🎉 Features complete for MVP (Minimum Viable Product)  

---
