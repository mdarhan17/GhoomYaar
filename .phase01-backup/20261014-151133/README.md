# GhoomYaar

**Advanced all-India tourism discovery and trip-planning platform (MERN + TypeScript).**

## Scope
- All 28 Indian states and 8 union territories; regions, cities and destinations.
- Month-wise, season-wise, weekday/weekend, festival and holiday discovery.
- Trip duration, preferences, budget, permits, safety and accessibility information.
- Google Maps integration, multi-stop road trips, route planning and itinerary editor.
- User profiles, reviews, group trips, wishlists and live collaboration.
- Admin curation, publishing approvals and verified destination content.

## Architecture
- `apps/web`: React + Vite client and admin experience.
- `apps/api`: Node.js + Express REST API and Socket.IO.
- `apps/worker`: future scheduled jobs and notifications.
- `packages/shared`: reusable domain types, validation schemas and constants.
- `packages/ui`: shared UI components.
- `data`: destination seed datasets, imports and fixtures.
- `infra`, `tests`, `docs`: deployment, quality and documentation.

## Important
This script generates an **organised scaffold only**, not a functioning application.
Implement entry points, APIs, schemas, database models, tests and integrations next.
Use local MongoDB during development. Add MongoDB Atlas migration at the final stage.
Do not commit secrets, maps server keys or environment files.
No AI, machine learning or data analytics modules are included.
