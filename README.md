# Anmol Lab Website

A team project developed during Codesaviours E-Training for Anmol Health Care Lab, Faisalabad.

## Project Structure

- `client/` — Next.js frontend
- `server/` — Node.js and Express backend

## Technology Stack

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

## Getting Started

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
```

Backend startup instructions will be added when the server entry point and startup scripts are finalized.

---

## Contributors

| Contributor | Role |
|---|---|
| M. Zohaib Khalid | Team Lead / Frontend Developer |
| Hammad Raza | Backend Developer |

---

## Frontend Development — Zohaib Khalid

**Role:** Team Lead / Frontend Developer

### Work Completed

- Initialized and configured the Next.js frontend.
- Established the frontend project structure.
- Developed the homepage layout and its major sections.
- Implemented the responsive navigation and mobile menu.
- Designed the hero section and primary calls to action.
- Created the laboratory brand information ticker using verified contact details.
- Developed the homepage TestFinder interface.
- Integrated the existing test-search frontend architecture.
- Implemented search loading, error, retry, empty-result, and result states.
- Worked on responsive styling and visual consistency across homepage sections.
- Created reusable page and layout components.

### Current Development Priorities

- Resolve remaining lint and production-build issues.
- Complete real backend integration for the test catalogue.
- Implement API-supported category filtering and pagination.
- Test frontend/backend response compatibility.
- Refine responsive layouts and homepage visual continuity.
- Continue implementing the remaining client-required website features.

---

## Backend Development — Hammad Raza

**Role:** Backend Developer

### Completed Work

- Initialized and configured the Node.js and Express backend.
- Configured MongoDB connection using Mongoose.
- Set up environment variables and backend project structure.
- Implemented Category CRUD APIs.
- Implemented Test CRUD APIs with search, filtering, and pagination.
- Developed CSV import functionality for laboratory tests.
- Implemented Package CRUD APIs with automatic pricing calculations.
- Implemented Branch CRUD APIs.
- Implemented Blog Post CRUD APIs with publication management.
- Implemented FAQ CRUD APIs.
- Implemented Contact Inquiry submission and management APIs.
- Added request validation for backend modules.
- Tested backend API functionality.
- Created API documentation in `docs/API_DOCUMENTATION.md`.
- Implemented chatbot rate limiting with a maximum of 20 messages per hour per identity.
- Added guest session identification using HTTP-only cookies and authenticated user identification using MongoDB user IDs.
- Integrated optional JWT authentication to allow both guests and logged-in users to access the chatbot.
- Tested rate-limit enforcement for guest and authenticated users, including HTTP 429 responses.


### Technologies Used

Node.js, Express.js, MongoDB, Mongoose, JavaScript, Multer, CSV Parser, Git and GitHub.- express-rate-limit
- cookie-parser
- JSON Web Token (JWT)

### Git Branch

`feature/hammad-backend-foundation`

---

## Brand Colors

The working colors were sampled from client-provided branding images. Final HEX values are pending client confirmation.

- **Primary:** `#22285C`
- **Secondary:** `#7D7E80`
- **Dark:** `#22285C`
- **Light:** `#EDF4FA`
- **Text:** `#22285C`

Detailed palette: `docs/client-assets/brand/colors.md`

---

## Content Needed from Client

The following information and assets require client confirmation or approval:

- Original high-resolution or vector logo (SVG preferred).
- Confirmation of official brand HEX colors.
- Complete branch list, addresses and Google Maps links.
- Opening hours and weekly holidays.
- Confirmation of public phone numbers, WhatsApp number and email.
- Official test catalogue, prices and categories.
- Sample types, preparation instructions and report turnaround times.
- Official health packages and prices.
- Home sample collection coverage, fees and booking procedure.
- Payment, cancellation and rescheduling policies.
- QR code destination and report verification procedure.
- Approved lab history, mission, equipment and quality information.
- Verification of staff names and credentials and permission to publish them.
- Approved privacy policy, terms and medical disclaimer.

**Social media:** The coordinator confirmed that the laboratory currently has no social media presence.

**Website:** The printed website address was checked by the team and did not open; a working official URL is pending.

For the complete record, see:

- `docs/client-assets/lab-info.md`
- `docs/client-assets/research/content-needed-from-client.md`

---

## Project

Developed as part of Codesaviours E-Training, November 2026.