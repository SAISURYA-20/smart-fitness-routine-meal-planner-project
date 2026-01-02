# Smart Fitness Routine & Meal Planner 🏋️‍♂️🥗

A full-stack web application that provides personalized fitness routines and meal plans based on user goals.

## Tech Stack

- **Frontend:** Angular 16, Angular Material, ng2-charts
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MySQL
- **Authentication:** JWT

## Features

- User registration with profile details (age, gender, height, weight)
- JWT authentication
- Personalized workout plans based on fitness goals
- Daily meal plans with calorie and macro tracking
- Progress tracking with charts
- Mark exercises and meals as completed

## Project Structure

```
smart-fitness/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Auth & plan controllers
│   │   ├── middleware/      # JWT auth, error handling
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Plan generator
│   │   └── server.ts        # Entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/app/
│   │   ├── components/      # All UI components
│   │   ├── services/        # API services
│   │   ├── guards/          # Route guards
│   │   └── models/          # TypeScript interfaces
│   └── package.json
│
├── .gitignore
└── README.md
```

## Prerequisites

- Node.js (v16+)
- MySQL Server (v8.0+)
- Angular CLI

## Installation

### 1. Clone & Setup Database

```bash
git clone <repository-url>
cd smart-fitness
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=fitness_planner
JWT_SECRET=your_secret_key
PORT=3000
```

Start server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
ng serve
```

App runs at `http://localhost:4200`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/profile` | Get profile |
| PUT | `/api/auth/profile` | Update profile |
| POST | `/api/plans/generate` | Generate weekly plan |
| GET | `/api/plans/weekly` | Get weekly plan |
| POST | `/api/plans/exercise/complete` | Toggle exercise |
| POST | `/api/plans/meal/consume` | Toggle meal |
| GET | `/api/plans/progress` | Get progress |

## License

MIT
