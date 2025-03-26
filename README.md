# CookEasy - Cooking Management System

A modern web application for connecting users with professional chefs for cooking experiences.

## Features

- User registration and authentication
- Browse different cuisines (Italian, Indian, Mexican etc.)
- View recipes and chef profiles
- Check chef availability
- Read ratings and reviews
- Book chefs based on availability
- Real time email functionality integration with system

## Tech Stack

- Frontend: Next.js 14 with TypeScript and SCSS
- Backend: Node.js with Express and TypeScript
- Database: PostgreSQL with sequelize
- Authentication: JWT

## Getting Started

### Prerequisites

- Node.js 18.x or later
- PostgreSQL 14.x or later
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

4. Create a `.env` file in the backend directory with the following variables:
   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/cookeasy
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

5. Create the PostgreSQL database:
   ```bash
   createdb cookeasy
   ```

### Development

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
cookeasy/
├── frontend/              # Frontend source code
│   ├── public/          # Public assets (images, icons, etc.)
│   ├── src/             # Next.js app directory
│   │   ├── app/         # Next.js app directory
│   │   ├── components/  # React components
│   │   ├── styles/      # SCSS styles
│   │   ├── lib/         # Utility functions
│   │   ├── types/       # TypeScript types
│   │   └── utils/       # Helper functions
├── backend/              # Backend source code
│   ├── config/          # Database configuration
│   ├── src/             # Backend source files
│   │   ├── controllers/ # Route controllers
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── models/      # Database models
│   │   ├── migrations/  # Database migrations
│   │   ├── seeders/     # Database seeders
│   │   ├── templates/   # Email and document templates
│   │   ├── middleware/  # Authentication middleware
│   │   ├── utils/       # Utility functions

```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 
