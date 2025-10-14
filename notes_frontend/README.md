# Notes Frontend (React)

A modern React UI to manage notes (create, view, edit, delete) with the Ocean Professional theme.

## Features
- List notes with client-side search
- Create and edit notes (title required, content optional)
- Delete notes with confirmation
- Loading and error states with toasts
- Responsive and accessible UI
- API base URL configurable via environment variable

## Getting Started

1. Install dependencies:
   - npm install

2. Configure environment (optional):
   - Copy `.env.example` to `.env` and adjust:
     - REACT_APP_API_BASE_URL=http://localhost:3001

3. Run the development server:
   - npm start
   - Open http://localhost:3000

Ensure the backend is running on http://localhost:3001 with endpoints:
- GET /notes
- POST /notes
- PUT /notes/:id
- DELETE /notes/:id

## Project Structure
- src/api/notesApi.js – API client (getNotes, createNote, updateNote, deleteNote)
- src/components/Header.jsx – App header with gradient and create button
- src/components/NotesList.jsx – Notes list, search, and actions
- src/components/NoteForm.jsx – Modal form for create/edit with validation
- src/components/ConfirmDialog.jsx – Confirmation modal for deletions
- src/styles/theme.css – Ocean Professional styles
- src/App.js – App shell and state management

## Theme
Ocean Professional:
- Primary #2563EB
- Secondary/Success #F59E0B
- Error #EF4444
- Background #f9fafb
- Surface #ffffff
- Text #111827

## Scripts
- npm start – Start development server
- npm run build – Production build
- npm test – Run tests
