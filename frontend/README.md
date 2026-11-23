# TripSync frontend

A responsive React + Vite client for the TripSync Spring Boot API.

## Run locally

1. Start the backend and its MySQL/Redis services from the repository root.
2. In a second terminal:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open http://localhost:5173.

Vite proxies `/auth`, `/api`, and `/actuator` to http://localhost:8080 by default. Set `API_PROXY_TARGET` to override the backend target.

## Included screens

- Editorial travel landing page with destination inspiration and responsive navigation
- Registration and JWT login
- Authenticated workspace overview and trip list/search
- Trip creation, itinerary days and activity creation
- Crew member list and invitation creation
- Expense creation with equal split and live member balances
- Shared document upload/download
- Notification feed and mark-as-read action

The UI calls the endpoints currently exposed by the backend. Expense history, editing/removing itinerary activities, and settlement creation are not presented as finished workflows because the current API does not expose all the read/update operations needed for a complete UI flow.

## Notes

- The frontend stores the access token in localStorage for this starter implementation.
- API requests use the same origin and rely on the Vite dev-server proxy.
- For production, serve the built frontend behind a reverse proxy and configure HTTPS, secure token storage, and the API origin appropriately.