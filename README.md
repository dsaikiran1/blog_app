# Blog Application

This project is a full-stack blog application built with React for the frontend and Node.js with Express for the backend. It enables users to read, create, edit, and delete blog posts, featuring user authentication, dynamic navigation, and a responsive design.

## Features

- **User Authentication**: Secure login and registration system using JSON Web Tokens (JWT).
- **CRUD Operations**: Users can create, read, update, and delete blog posts.
- **Dynamic Routing**: Implemented with React Router for seamless navigation between pages.
- **Responsive Design**: Optimized for various screen sizes using modern CSS frameworks.

## Project Structure

The project is organized into two main directories:

- **backend/**: Contains all server-side code using Node.js and Express, including API routes, middleware, and backend-specific configurations.
- **frontend/**: Contains all client-side code using React, including components, styles, and assets.
- **Root package.json**: Manages shared dependencies and scripts for both frontend and backend projects from a single command.

## Installation

To set up the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blog_app.git
cd blog_app
```

### 2. Install Dependencies

Install both backend and frontend dependencies:

```bash
# Install backend dependencies
npm install --prefix backend

# Install frontend dependencies
npm install --prefix frontend
```

### 3. Set Up Environment Variables

#### Backend:
Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

#### Frontend:
Create a `.env` file in the `frontend` directory with necessary configurations, if any.

### 4. Start the Application

In the root directory, start both the backend and frontend servers concurrently:

```bash
npm run start
```

The application should now be running with the backend at `http://localhost:5000` and the frontend at `http://localhost:3000`.

## Usage

- **Home Page**: Displays a list of blog posts. Clicking on a post navigates to the detailed view.
- **Blog Detail Page**: Shows the full content of a selected blog post.
- **User Authentication**: Users can register and log in to create, edit, or delete their posts.

## Technology Stack

### Frontend:
- React
- React Router
- Axios
- Framer Motion
- @emotion/react
- @emotion/styled

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- Bcrypt.js
- Multer
- CORS
- Dotenv
- Express Validator

### Dev Dependencies:
- Nodemon
- Cross-env
- Autoprefixer
- PostCSS

## Deployment

The application can be deployed using various platforms. Below are general steps to deploy on a platform like Render:

### 1. Create an Account
Sign up on the deployment platform.

### 2. Connect Your Repository
In the platform's dashboard, create a new Web Service and connect your GitHub repository.

### 3. Configure Build and Start Commands

#### Backend:
- **Build Command**: `npm run build --prefix backend`
- **Start Command**: `npm run start`
- **Environment Variables**: Set the necessary environment variables (`PORT`, `MONGODB_URI`, `JWT_SECRET`) in the platform's dashboard.

#### Frontend:
- **Build Command**: `npm install --prefix frontend && npm run build --prefix frontend`
- **Publish Directory**: `frontend/build`
- **Environment Variables**: Set any necessary environment variables.

### 4. Deploy
The platform will automatically build and deploy the application. Monitor the deployment logs for any issues.

For detailed guidance, refer to the platform's documentation on deploying Node.js and React applications.
