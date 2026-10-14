# GhoomYaar — India's travel discovery and planning platform

Advanced TypeScript MERN monorepo, developed module by module. **No AI, ML, or data analytics.**

## Phase 1 — running application

- React + Vite responsive client (`apps/web`)
- Express v5 REST API (`apps/api`)
- Shared 28 states + 8 union territories catalog (`packages/shared`)
- Region and name-based search through live `/api/v1/states` endpoint
- Email/password signup, login and session restore using an HttpOnly cookie
- Local MongoDB for user accounts, input validation, API rate limits and tests

## Requirements

- Node.js 22.12 or higher
- npm included with Node
- MongoDB Community Server running locally on port 27017 (or change MONGODB_URI)

## Install

From the `GhoomYaar` root folder:

```powershell
npm install
npm run build:shared
npm run dev
```

Web: http://127.0.0.1:5173  |  API: http://127.0.0.1:5000/api/v1/health

If the API fails to start, ensure local MongoDB is running. This phase deliberately does not require Google Maps credentials.

## Checks

```powershell
npm run typecheck
npm test
npm run build
```

## Planned next phases

2. Database-backed destinations, attractions, localities, content approval, and seed imports.
3. Month-wise and season-wise discovery, weekdays/weekends, public holidays.
4. Google Maps, multi-stop road trips, route feasibility and saved itineraries.
5. Collaborative trips, Socket.IO events, travel checklists, accessibility and advisories.
6. Hardened admin operations, monitoring, deployment and MongoDB Atlas migration **at the end**.

Production hardening later: CSRF tokens for cross-site deployments, password reset/email verification, refresh-session rotation, backups, security review, and CDN/media storage.