# Portfolio

A fullstack personal portfolio. TypeScript everywhere.

## Stack

**Frontend** (`/frontend`)
- Next.js 14 (App Router)
- TypeScript (strict)
- TailwindCSS
- Cloudinary-hosted images via `next/image`

**Backend** (`/backend`)
- Node.js + Express + TypeScript (strict)
- MongoDB + Mongoose
- Cloudinary SDK + Multer for uploads
- CORS + dotenv

## Project Structure

```
Portfilo/
├── frontend/        # Next.js app
├── backend/         # Express API
├── render.yaml      # Render blueprint (backend)
├── README.md
└── .gitignore
```

## Prerequisites

- Node.js >= 20
- npm
- MongoDB Atlas account (free tier)
- Cloudinary account (free tier)

## Setup

### 1. Clone

```bash
git clone <repo-url>
cd Portfilo
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# fill in MongoDB URI, Cloudinary keys, etc.
npm install
npm run dev      # http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
cp .env.local.example .env.local
# set NEXT_PUBLIC_API_URL=http://localhost:5000
npm install
npm run dev      # http://localhost:3000
```

## Environment Variables

### Backend (`/backend/.env`)

| Key | Description |
|---|---|
| `PORT` | Server port (e.g. `5000`) |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `CLIENT_URL` | Frontend URL for CORS (e.g. `http://localhost:3000`) |

### Frontend (`/frontend/.env.local`)

| Key | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API URL (e.g. `http://localhost:5000`) |

## Deployment

### Frontend → Vercel

1. Push the repo to GitHub.
2. In Vercel, **Import Project** → select the repo.
3. Set **Root Directory** to `frontend`.
4. Add env var: `NEXT_PUBLIC_API_URL` (your deployed backend URL).
5. Deploy. `frontend/vercel.json` is already configured.

### Backend → Render

1. Push the repo to GitHub.
2. In Render, **New → Blueprint** → connect the repo.
3. Render reads `render.yaml` at the repo root and provisions the service.
4. Set env vars in the Render dashboard: `MONGODB_URI`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `CLIENT_URL`.
5. Deploy.

### Database → MongoDB Atlas

1. Create a free M0 cluster.
2. Network Access → allow `0.0.0.0/0` (for Render) plus your local IP.
3. Database Access → create a user, copy the connection string.
4. Paste into backend `MONGODB_URI`.

## Scripts

### Frontend

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

### Backend

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server with hot reload (tsx) |
| `npm run build` | Compile TS to `dist/` |
| `npm run start` | Run compiled output |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
