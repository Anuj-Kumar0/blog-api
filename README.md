# Blog API with Separate Frontends

This project involves creating a RESTful backend for a blog system, with separate frontends for public users and admin authors. The backend handles posts, comments, and user authentication, while the frontends interact with the API for different user roles.

## Project Structure

- **Backend (API)**: Built with Node.js, Express, Prisma, and JWT for authentication.
- **Frontend 1 (Public)**: A blog for readers to view posts and comment.
- **Frontend 2 (Admin)**: A dashboard for authors to manage posts and comments.

## Features

- **Posts**: Create, edit, delete, and publish posts (Admin only).
- **Comments**: Post and manage comments on posts.
- **Authentication**: JWT-based authentication for the admin interface.
- **Admin Features**: Publish/unpublish posts and manage comments.

## Tech Stack

- **Backend**: Node.js, Express, Prisma, JWT
- **Frontend**: ReactJS, Fetch API, Axios
- **Database**: PostgreSQL (via Prisma ORM)

## Installation

1. Clone the repo:
    ```bash
    git clone <repo-url>
    ```

2. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Set up the database and run migrations:
    ```bash
    npx prisma migrate dev
    ```

4. Start the backend API:
    ```bash
    npm start
    ```

5. Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```

6. Start the frontend:
    ```bash
    npm start
    ```

## API Endpoints

- **POST** `/api/auth/login`: Login to get JWT.
- **GET** `/api/posts`: View all posts (Public).
- **POST** `/api/posts`: Create a new post (Admin).
- **POST** `/api/comments`: Post a comment (Public).
- **PUT** `/api/posts/:id`: Edit post (Admin).

## Authentication

- Login returns a JWT, used to authenticate admin requests.
- Send JWT in `Authorization: Bearer <token>` header.

## Deployment

- Backend: Deployed on Render.
- Frontend: Deployed on Vercel.
