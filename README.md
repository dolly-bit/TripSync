# TripSync

TripSync is a collaborative trip-planning backend built with Java 25, Spring Boot, MySQL, Redis and JWT authentication, with a React + Vite frontend.

## Run the full stack with Docker

1. Copy the example environment file and configure the required values:

   ```powershell
   Copy-Item .env.example .env
   ```

   Set `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`, and any optional bootstrap-admin or mail settings in `.env`. Never commit the real `.env` file.

2. Start the stack from the repository root:

   ```powershell
   docker compose up -d --build
   ```

3. Open:
   - Frontend: http://localhost:5173
   - Backend health: http://localhost:8080/actuator/health
   - Swagger UI: http://localhost:8080/swagger-ui/index.html

Flyway applies the versioned SQL migrations when the backend starts.

## Run the frontend outside Docker

Start the backend with Docker, then run:

```powershell
cd frontend
npm install
npm run dev
```

Vite serves the app on http://localhost:5173 and proxies API requests to http://localhost:8080.

## Implemented backend modules

- JWT registration and login
- Trip CRUD and member roles
- Trip invitations
- Day itineraries and activities
- Expense creation, member balances and settlements
- Trip document upload/download
- Notifications
- Redis cache and Actuator health

See [frontend/README.md](frontend/README.md) for frontend capabilities and current API coverage.