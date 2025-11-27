# Conference Portal — Frontend (JavaScript + React + Vite)

## Summary
A responsive conference & training portal built with React + Vite (JavaScript), using mock JSON data (public/data). Features: events list, search, pagination, event modal with mock registration, calendar view (FullCalendar), and charts.

## Quick start
1. Clone the repo.
2. `npm install`
3. `npm run dev`
4. Open http://localhost:5173

## Data
- Mock data files are in `public/data/`:
  - `public/data/events.json`
  - `public/data/trainers.json`

## Scripts
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run preview` — preview built app
- `npm test` — run Vitest tests

## Tech
- React, Vite, FullCalendar, Chart.js, react-chartjs-2, dayjs

## Notes
- Theme persisted to localStorage.
- Event registration is mocked (fake delay + alert).
- Put images in `public/assets/`.

## Tests
- Example test in `src/components/EventCard/EventCard.test.jsx`
- Run `npm test` to execute.

