# Internship Management System (IMS) 

* 22i - 2716 (Azmar Kashif)
* 22i - 2511 (Awais)
* 22i - 2434 (Hassaan)

## Deployment

  Site is hosted on a Private VPS at http://51.68.190.60:5173

## Overview

The Internship Management System (IMS) is a comprehensive web application designed to streamline the management of internships. Built with a robust Node.js backend and a user-friendly React frontend, IMS offers features for managing departments, assigning tasks, tracking attendance, conducting performance evaluations, handling feedback, and generating certificates. This README provides a detailed guide to setting up, running, and using the IMS application.

## Table of Contents

* [Features](#features)
* [Technology Stack](#technology-stack)
* [Setup and Installation](#setup-and-installation)
    * [Prerequisites](#prerequisites)
    * [Backend Setup](#backend-setup)
    * [Frontend Setup](#frontend-setup)
* [Running the Application](#running-the-application)
* [Usage](#usage)
    * [Admin Dashboard](#admin-dashboard)
    * [Supervisor Dashboard](#supervisor-dashboard)
    * [Internee Dashboard](#internee-dashboard)
* [API Endpoints](#api-endpoints)
* [Contributing](#contributing)
* [License](#license)


## Features

* **User Management:** Create, manage, and update user profiles with different roles (Admin, Supervisor, Internee).  Includes features for activating and deactivating user accounts.
* **Department Management:** Create, manage, and update departments, assign supervisors and internees to departments.  Supports assigning department heads.
* **Task Management:** Assign tasks to internees, track progress, add comments, and manage deadlines.  Internees can submit deliverables with file uploads. Supervisors can provide feedback on submissions.
* **Resource Management:** Request, allocate, and manage resources (laptops, workstations, etc.).  Includes features for tracking resource availability and utilization.  Admins can allocate resources directly, while internees can submit resource requests.
* **Attendance Tracking:**  Internees can check in and out, supervisors and admins can view attendance records and summaries.  Includes features for calculating total hours worked and identifying late arrivals.
* **Performance Evaluation:** Supervisors can create and manage performance evaluations for internees.  Supports multiple metrics and overall ratings.
* **Feedback System:**  Internees and supervisors can provide feedback on tasks and overall performance.  Supports different feedback types (task feedback, clarification requests, end-of-internship feedback).  Admins can view and resolve feedback.
* **Certificate Generation:** Generate and manage internship completion certificates with QR code validation.  Supervisors can approve certificates before issuance.  Certificates include QR codes for easy verification.
* **Notifications:** Receive notifications about new tasks, feedback, and certificate status.  Notifications are sent via email and stored in the database.
* **System Monitoring (Admin):** Monitor system health, CPU usage, memory usage, database status, and active connections.  Provides real-time insights into system performance.


## Technology Stack

**Backend:**

* Node.js
* Express.js
* Mongoose (MongoDB ODM)
* bcrypt (Password hashing)
* jsonwebtoken (JWT authentication)
* multer (File uploads)
* nodemailer (Email notifications)
* other npm packages (see `package.json`)

**Frontend:**

* React
* TypeScript
* Vite
* React Router DOM
* Tailwind CSS
* Lucide React (Icons)
* Chart.js (for charts)


## Setup and Installation

### Prerequisites

* Node.js and npm (or yarn) installed on your system.  Node.js version 18 or higher is recommended.
* MongoDB running locally or a connection string to a remote MongoDB instance.
* A valid SMTP server configuration for email notifications (optional, but recommended).

### Backend Setup

1. **Clone the repository:** (Note: Git is not available in this environment. The code is provided directly.)
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set environment variables:** Create a `.env` file in the `server` directory and populate it with the following:  Ensure you replace the placeholders with your actual values.
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173  // Or your client URL
   SERVER_URL=http://localhost:3000 // Or your server URL
   CLIENT_PORT=5173 // Or your client port
   SERVER_PORT=3000 // Or your server port
   SMTP_HOST=your_smtp_host
   SMTP_PORT=your_smtp_port
   SMTP_USER=your_smtp_user
   SMTP_PASS=your_smtp_password
   EMAIL_FROM=your_email_address
   GOOGLE_CLIENT_ID=your_google_client_id // For calendar integration (optional)
   GOOGLE_CLIENT_SECRET=your_google_client_secret // For calendar integration (optional)
   GOOGLE_REDIRECT_URL=your_google_redirect_url // For calendar integration (optional)
   ```
4. **Run the backend:**
   ```bash
   npm run server
   ```

### Frontend Setup

1. **Navigate to the frontend directory:** `cd /home/project/src`
2. **Install dependencies:**
   ```bash
   pnpm install
   ```
3. **Run the frontend:**
   ```bash
   pnpm run dev
   ```

## Running the Application

The application consists of two parts: the backend server and the React frontend. You need to run both simultaneously. The `package.json` scripts are configured to handle this using `concurrently`.

1. Make sure you have completed the backend and frontend setup steps.
2. Run the development server:
   ```bash
   pnpm run dev
   ```
This will start both the backend and frontend servers concurrently.  You can then access the application in your browser at `http://localhost:5173`.

## License

MIT License
