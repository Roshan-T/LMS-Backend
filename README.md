<div align="center">

# 🎓 LMS (Learning Management System) - Server

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.7+-blue)
![Node.js](https://img.shields.io/badge/Node.js-16.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-green)
![License](https://img.shields.io/badge/license-MIT-orange)

**A modern, full-featured Learning Management System for delivering exceptional educational experiences**

</div>

## 📋 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Deployment](#deployment)
- [Author](#author)

## 📖 Introduction

This Learning Management System (LMS) is a robust platform designed to facilitate online education. It provides a comprehensive set of features for course management, user authentication, content delivery, and administrative controls.

The system is built with a modern tech stack, featuring TypeScript for type safety, Express for the backend framework, MongoDB for database storage, Redis for caching, and Cloudinary for media management.

## Features

### 👤 User Management

- **Authentication**: Secure user registration with email verification
- **Social Login**: Integration with social platforms for quick access
- **JWT Security**: Token-based authentication with refresh capabilities
- **Role-Based Access**: Different permissions for Admin and User roles
- **Profile Management**: Update personal information, passwords, and profile pictures

### 📚 Course Management

- Course creation, editing, and deletion
- Support for videos, links, and other resource types
- Course content organization by sections
- Course thumbnails managed via Cloudinary
- Course tagging and categorization

### Learning Features

- Course purchase and enrollment
- Progress tracking
- Q&A feature for each course section
- Rating and review system

### Order & Payment

- Course purchase management
- Order confirmation emails
- Payment tracking

### Notification System

- Real-time notifications for important events
- Email notifications
- Automated cleanup of read notifications

### Admin Features

- User management (view all users, update roles, delete users)
- Course management
- Order management
- Analytics dashboard (user and course statistics)
- Layout customization (Banner, FAQ, Categories)

### Layout Management

- Customizable banner with image, title, and subtitle
- FAQ section management
- Categories management

## Technologies Used

- **Backend Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Caching**: Redis for improved performance
- **Media Storage**: Cloudinary for images and media files
- **Email**: Nodemailer with EJS templates
- **Security**:
  - bcryptjs for password hashing
  - CORS protection
  - Error handling middleware
- **Development**: ts-node-dev for development environment

## 🏗️ System Architecture

The system follows a clean, modular architecture designed for maintainability and scalability:

- **Models**: Define database schemas and interfaces
- **Controllers**: Handle request processing and business logic
- **Routes**: Define API endpoints and map to controllers
- **Middleware**: Authentication, error handling, async error catching
- **Services**: Handle business logic separate from controllers
- **Utils**: Reusable utility functions (Redis, JWT, error handling, etc.)
- **Mails**: Email templates using EJS

## 🔄 API Reference

### 👤 User Routes

| Method   | Endpoint                       | Description             | Access |
| -------- | ------------------------------ | ----------------------- | ------ |
| `POST`   | `/api/v1/registration`         | Register a new user     | Public |
| `POST`   | `/api/v1/activate-user`        | Activate user account   | Public |
| `POST`   | `/api/v1/login-user`           | User login              | Public |
| `GET`    | `/api/v1/logout-user`          | User logout             | User   |
| `GET`    | `/api/v1/refreshtoken`         | Refresh access token    | User   |
| `GET`    | `/api/v1/me`                   | Get user profile        | User   |
| `POST`   | `/api/v1/social-auth`          | Social authentication   | Public |
| `PUT`    | `/api/v1/update-user-info`     | Update user information | User   |
| `PATCH`  | `/api/v1/update-user-password` | Update password         | User   |
| `PATCH`  | `/api/v1/update-user-avatar`   | Update profile picture  | User   |
| `GET`    | `/api/v1/get-users`            | Get all users           | Admin  |
| `PUT`    | `/api/v1/update-user`          | Update user role        | Admin  |
| `DELETE` | `/api/v1/delete-user/:id`      | Delete user             | Admin  |

### 📚 Course Routes

| Method   | Endpoint                         | Description            | Access |
| -------- | -------------------------------- | ---------------------- | ------ |
| `POST`   | `/api/v1/create-course`          | Create a new course    | Admin  |
| `PUT`    | `/api/v1/edit-course/:id`        | Edit course            | Admin  |
| `GET`    | `/api/v1/get-course/:id`         | Get single course      | Public |
| `GET`    | `/api/v1/get-courses`            | Get all courses        | Public |
| `GET`    | `/api/v1/get-course-content/:id` | Get course content     | User   |
| `PUT`    | `/api/v1/add-question`           | Add question to course | User   |
| `PUT`    | `/api/v1/add-answer`             | Add answer to question | User   |
| `PUT`    | `/api/v1/add-review/:id`         | Add review to course   | User   |
| `PUT`    | `/api/v1/add-reply/:id`          | Reply to review        | Admin  |
| `DELETE` | `/api/v1/delete-course/:id`      | Delete course          | Admin  |

### 💳 Order Routes

| Method | Endpoint               | Description        | Access |
| ------ | ---------------------- | ------------------ | ------ |
| `POST` | `/api/v1/create-order` | Create a new order | User   |
| `GET`  | `/api/v1/get-orders`   | Get all orders     | Admin  |

### 🔔 Notification Routes

| Method | Endpoint                          | Description                | Access |
| ------ | --------------------------------- | -------------------------- | ------ |
| `GET`  | `/api/v1/get-all-notifications`   | Get all notifications      | Admin  |
| `PUT`  | `/api/v1/update-notification/:id` | Update notification status | Admin  |

### 📊 Analytics Routes

| Method | Endpoint                        | Description          | Access |
| ------ | ------------------------------- | -------------------- | ------ |
| `GET`  | `/api/v1/get-users-analytics`   | Get user analytics   | Admin  |
| `GET`  | `/api/v1/get-courses-analytics` | Get course analytics | Admin  |

### 🎨 Layout Routes

| Method | Endpoint                | Description        | Access |
| ------ | ----------------------- | ------------------ | ------ |
| `POST` | `/api/v1/create-layout` | Create layout      | Admin  |
| `PUT`  | `/api/v1/edit-layout`   | Edit layout        | Admin  |
| `GET`  | `/api/v1/get-layout`    | Get layout by type | Public |

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v16.x or higher)
- MongoDB (local or Atlas)
- Redis server
- Cloudinary account
- SMTP server access (or Gmail account)

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/lms-server.git

# Navigate to the server directory
cd lms/server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
port=8000
ORIGIN=["http://localhost:3000"]
NODE_ENV=development

# Database
DB_URI=mongodb+srv://youruser:yourpassword@cluster.mongodb.net/yourdatabase

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_SECRET_KEY=your_cloudinary_secret_key

# Redis Configuration
REDIS_URL=rediss://default:yourredispassword@your-redis-host:6379

# Authentication
ACTIVATION_SECRET=your_activation_secret_key
ACCESS_TOKEN=your_access_token_secret
ACCESS_TOKEN_EXPIRE=5
REFRESH_TOKEN=your_refresh_token_secret
REFRESH_TOKEN_EXPIRE=59

# SMTP (Email) Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

## 🚀 Usage

After starting the server, the API will be accessible at `http://localhost:8000` (or the port specified in your environment variables).


## Author

Roshan Tiwari
