# Student Management System — ITUE301 Practicals 1–13

CHARUSAT Faculty of Technology and Engineering. The lab list uses a student portfolio and a task manager; this repository maps every practical onto a **Student Management System**.

## How to run locally

You need two terminals. MongoDB must be running (local or Atlas).

```bash
# backend
cd backend
copy .env.example .env
npm install
npm start
```

```bash
# frontend
cd Student_Management_system
npm install
npm run dev
```

Open http://localhost:5173

1. Register a staff account on **Login**
2. Open **Students** to create, edit, and delete records (stored in MongoDB)
3. Use **Generate description** for an AI suggestion (needs `OPENAI_API_KEY` or `GEMINI_API_KEY`; otherwise a local fallback is used)

Docker (Practical 11):

```bash
docker compose up --build
```

Open http://localhost:5173. The first startup automatically creates reference records and this demo staff account:

```text
Email:    demo@charusat.edu
Password: Student@123
```

The frontend, API, and MongoDB run as separate containers. The MongoDB data is kept in the `sms-data` Docker volume, so records survive container restarts.

## Practical mapping

| Lab | Required idea | Where it is in this app |
| --- | --- | --- |
| 1 | Vite + reusable components + props | `Header`, `About`, `Skills`, `Footer` on Home |
| 2 | React Router + useState | Routes in `App.jsx`, Contact form, dark mode |
| 3 | REST fetch + loading/error | `Resources.jsx` GitHub API |
| 4 | Express CRUD + middleware | `backend/app.js`, `routes/students.js` |
| 5 | Mongoose schema | `backend/models/Student.js` |
| 6 | Full-stack wiring + CORS | `src/api.js` → `http://localhost:5000` |
| 7 | JWT + bcrypt + validation | `/auth/register`, `/auth/login`, auth middleware |
| 8 | lazy + Suspense | `App.jsx` lazy routes |
| 9 | node-cache + invalidation | `backend/cache.js` |
| 10 | EventEmitter | `backend/events.js`, `listeners.js` |
| 11 | Docker Compose | `docker-compose.yml` |
| 12 | GitHub Actions | `.github/workflows/ci.yml` |
| 13 | AI API, key on server | `backend/routes/ai.js` |

## API

| Method | Path | Auth |
| --- | --- | --- |
| POST | `/auth/register` | no |
| POST | `/auth/login` | no |
| GET | `/me` via `/auth/me` | yes |
| GET/POST | `/students` | yes |
| GET/PUT/DELETE | `/students/:id` | yes |
| POST | `/api/ai/generate-description` | yes |
| GET | `/health` | no |
| GET | `/debug/cache` | no |

## Tests

```bash
cd backend
npm test
```
