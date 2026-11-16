# Anmol Health Care Lab — Team B

A local-first diagnostic laboratory website built as the **Codesaviours E-Training 2026 Team B** project. The project brings together a public laboratory website, test discovery, health packages, cart and booking interfaces, patient-facing pages, staff/admin areas, and backend services for laboratory content and AI-assisted support.

> **Submission status (16 November 2026):** The frontend and backend foundations have been developed in parallel and the latest reported frontend lint/build checks passed after the cart and booking UI update. Full end-to-end verification is still dependent on the backend owner's MongoDB Atlas access and confirmation of the remaining booking, slot, report and AI integration contracts. This repository is intended to run on localhost; it is not a production deployment.

## Project links

- **GitHub repository:** https://github.com/killershark0125-art/codesaviours-ETraining-TeamB-AnmolLab
- **Main branch:** `main`
- **Frontend working branch:** `feature/zohaib-frontend-setup`
- **Backend working branch:** `feature/hammad-backend-foundation`
- **Demo video:** Not included in this submission package. The designated video owner must record and upload the team demo to `demo/` and Google Classroom.

## Client and project goals

**Client:** Anmol Health Care Lab — a medical diagnostic laboratory in Faisalabad, Pakistan.

The website is designed around four common patient tasks:

1. Find a laboratory test and check its published price and preparation information.
2. Explore health packages and choose individual tests.
3. Request a branch visit or home sample collection.
4. Access patient services and reports through appropriate authenticated areas.

### Client information currently supplied

| Item | Supplied information |
|---|---|
| Public name | Anmol Health Care Lab |
| Short name | Anmol Lab |
| Tagline | Precision in every test. Care in every patient. |
| Address supplied | Sultani Chowk, Gulshan Muhammad Abad, Faisalabad, Pakistan |
| Phone | 0316-6474766 / 0321-6671476 |
| Email | anmollaboratory@gmail.com |
| WhatsApp | Not confirmed; do not publish an unverified number |
| Social profiles | Client confirmed no official social-media presence at the time of content collection |
| Opening hours / additional branches | Require confirmation from the client |

Do not publish unconfirmed prices, opening hours, branch pins, medical claims, accreditations, testimonials or coverage areas. The initial test prices shared during development require client confirmation before being treated as official prices.

## Team and feature ownership

The project brief identifies Team B as Eman Akhtar, M. Zohaib Khalid, Hadiya and Hammad Raza, with Eman leading Days 1–6 and M. Zohaib Khalid leading Days 7–12. The working implementation activity reported in this project conversation has primarily involved M. Zohaib Khalid and Hammad Raza. Confirm the final registered roster, student IDs and individual feature ownership with the coordinator before final grading records are submitted.

| Contributor | Confirmed project role / contribution context |
|---|---|
| M. Zohaib Khalid (student ID 1408) | Team lead Days 7–12; frontend implementation and integration: public website, shared UI, test catalogue/detail, packages, cart and booking interfaces, responsive styling and frontend QA |
| Hammad Raza (student ID to be confirmed) | Backend implementation: Express/Mongoose APIs, database integration, CRUD validation, user/authentication and role middleware, Groq chatbot service foundation and admin setup command |
| Eman Akhtar (student ID / feature attribution to confirm) | Listed in the official brief; Team B lead Days 1–6 |
| Hadiya (student ID / feature attribution to confirm) | Listed as a Team B member in the official brief; feature attribution to confirm |

## Technology stack

### Frontend

- Next.js App Router (project initialized with Next.js 16.4.4)
- React and TypeScript
- CSS Modules and shared design tokens
- Client-side API utilities and reusable hooks

### Backend

- Node.js and Express
- Mongoose for MongoDB data access
- dotenv for environment configuration
- CORS and request middleware
- Groq-backed chatbot service foundation

### Data and integrations

- MongoDB Atlas (connection access is managed by the backend project owner)
- REST API between the Next.js client and Express server
- AI provider called from the backend; never expose provider keys in browser code

## Brand and interface system

| Token | Value | Use |
|---|---|---|
| Primary / navy | `#22285C` | Brand, headings, primary actions |
| Secondary grey | `#7D7E80` | Supporting details and muted accents |
| Light blue | `#EDF4FA` | Soft surfaces and section backgrounds |
| White | `#FFFFFF` | Main surfaces and contrast |
| Body text | `#22285C` / accessible neutral variants | Text, subject to contrast checks |

Typography uses Instrument Serif for selected editorial headings and Manrope for interface text. Keep the interface readable, restrained, mobile-friendly and keyboard accessible. Avoid unsupported medical or business claims.

## Feature status

The following table distinguishes built interface/API foundations from workflows that still need integration testing. A page existing does not mean its backend operation has passed an end-to-end test.

| Area | Current implementation context | Verification / remaining work |
|---|---|---|
| Public website | Home, about, tests, packages, branches, home sampling, doctors, blog, FAQ, contact and legal-page work | Check all routes and client-approved content before handover |
| Test catalogue | API-backed test search and category data; test detail route work | Verify filters, pagination, detail fields and official test prices against live API data |
| Health packages | Package listing/detail API client; package selection in cart | Verify live package records, included-test references and price fields |
| Cart | Separate test and package selections; overlap-aware pricing helper; pending-price handling | Confirm package/test overlap against server-side pricing; do not treat client subtotal as final charge |
| Booking | Booking interface and branch loading; package selection summary | Booking creation, time-slot capacity, overbooking prevention, confirmations and email need backend contract and end-to-end verification |
| Patient / doctor / staff / admin areas | Frontend routes and page work are present in the project history | Verify current routes, role guards, API data and authorization in a running environment |
| Authentication | Backend user/authentication and role middleware were added through merged backend work | Verify signup/login, JWT/session handling, forgot/reset password and role restrictions |
| Reports | Reports interface work and report-explainer consent UI | Verify secure upload, private storage, owner/referrer authorization and download; never expose report files via public URLs |
| AI assistant | Groq chatbot controller/service and rate-limiting foundation added to backend | Verify frontend-to-backend session, catalogue grounding, rate limits and safety disclaimer |
| Prescription upload | UI work existed in the project history | OCR/vision extraction, matching and explicit patient confirmation require verification |
| Report explainer | Consent-first report-explainer frontend work | Actual report processing and safe explanation API remain to be verified |
| Contact / FAQ / blog | Backend API/controller work exists for inquiries, FAQs and posts | Confirm live CRUD/list behaviour and published content |

## Repository structure

```text
codesaviours-ETraining-TeamB-AnmolLab/
├── client/                  # Next.js frontend
│   ├── app/                 # App Router pages and route layouts
│   ├── components/          # Shared and feature components
│   └── lib/                 # API clients, hooks, types and helpers
├── server/                  # Express backend
│   ├── config/              # Database and server configuration
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Authentication, roles and request middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API route definitions
│   ├── scripts/             # Administrative scripts
│   ├── services/            # External service integrations
│   └── storage/             # Private uploads; must remain untracked
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── handover/            # Team-lead handover notes, if maintained
│   ├── plan.md              # Add/verify project plan and diagrams
│   ├── postman/             # Exported Postman collection (add/verify)
│   └── presentation/        # Final team presentation
├── demo/                    # Team demo video; not included yet
├── .gitignore
└── README.md
```

## Local setup

### Requirements

- Node.js (the development environment used during this project was Node.js 24.18.1)
- npm
- Git
- MongoDB Atlas access or an approved MongoDB connection supplied by the backend owner

### 1. Clone the repository

```bash
git clone https://github.com/killershark0125-art/codesaviours-ETraining-TeamB-AnmolLab.git
cd codesaviours-ETraining-TeamB-AnmolLab
```

### 2. Configure the backend

```bash
cd server
npm install
```

Create `server/.env` using `server/.env.example` as the source of truth for the exact variable names. At minimum, configure the MongoDB URI and any authentication, AI-provider, email or CORS values required by the current backend code. Do not copy secrets into this README or commit `.env`.

The project owner must allow the developer's public IP in MongoDB Atlas Network Access and confirm the cluster, database user and connection URI. The frontend contributor did not have Atlas project ownership, so database connectivity could not be independently verified from that account.

Start the API:

```bash
npm run dev
```

The development server has been configured to use port `5000` unless overridden by the backend environment.

### 3. Configure the frontend

Open a second terminal:

```bash
cd client
npm install
```

Create `client/.env.local` and set the API base URL used by the client:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start Next.js:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser. The API must be running and reachable for live catalogue, package, branch and other API-backed sections.

### 4. Quality checks

Run from `client/`:

```bash
npm run lint
npm run build
```

Run backend checks using the scripts actually defined in `server/package.json`. At handover, record the exact commands and results used for the backend. A successful frontend build does not establish that MongoDB, booking, reports, email or AI operations work end to end.

## Environment variables

Never commit `.env`, `.env.local`, provider credentials, database passwords, JWT secrets, patient data or uploaded reports.

| Location | Variable / configuration | Purpose |
|---|---|---|
| `client/.env.local` | `NEXT_PUBLIC_API_URL` | Public base URL for the Express API |
| `server/.env` | MongoDB URI (the development config has used `MONGO_URI`) | Atlas / MongoDB connection |
| `server/.env` | Port setting (if configured; default is 5000) | Express listener |
| `server/.env` | JWT/authentication secret(s) | Token signing / authentication |
| `server/.env` | Groq API key / model setting (names are defined by backend code) | Server-side chatbot provider |
| `server/.env` | Email and CORS settings, if enabled | Notifications and allowed client origin |

**Important:** `server/.env.example` and the current backend source are authoritative for exact variable names. The table above describes configuration purposes; do not create duplicate or differently named variables if the code expects another name.

## API areas

The backend route/controller work currently includes these areas (consult `docs/API_DOCUMENTATION.md` and the actual route files for exact methods and payloads):

- Tests and categories
- Health packages
- Branches
- Blog posts
- FAQs
- Contact inquiries
- User authentication and role middleware
- AI chatbot sessions / Groq service

Do not assume that booking slots, booking creation, report upload/download, email notifications or every portal operation are available merely because related frontend pages exist. Verify the current backend route files and API documentation before demoing those actions.

## Privacy, security and clinical-content rules

- Do not put patient reports or private uploads in a public static directory.
- Enforce authorization on the server for all protected operations and every report download.
- Do not store passwords, tokens or medical reports in localStorage.
- Keep API keys and credentials on the server and out of Git history.
- Use fake test accounts and synthetic data for demos; never commit real patient information.
- AI screens must clearly state that the assistant does not provide medical advice and must direct patients to a qualified clinician for interpretation or decisions.
- Obtain patient consent before sending report contents to an AI service.
- Treat prices, timings, branches, sample collection coverage and all medical preparation guidance as client data that must be verified.

## Content still needed from the client

Confirm and add the following before the website is handed to Anmol Lab:

- Official logo files and approved variants (transparent, white and favicon)
- Final test catalogue (at least 60 real tests) with approved prices, sample types, preparation/fasting information and report times
- Health package names, included tests, original prices, approved package prices and savings
- Confirmed branch names, exact addresses, map pins, telephone numbers and opening hours
- Home sampling areas, availability, time slots and any additional charges
- Whether WhatsApp is available and the approved number/link
- Report download process and patient identity/booking verification requirements
- Approved laboratory story, equipment/quality-process details and staff/doctor information
- Written approval for any claims, accreditation references, testimonials or imagery (do not invent these)

## Final submission checklist

- [ ] Confirm the official team roster, student IDs and each member's owned feature.
- [ ] Verify a fresh clone runs using only the documented setup steps.
- [ ] Confirm Atlas connectivity with the database owner.
- [ ] Run frontend lint/build after the final merged changes.
- [ ] Test public routes, authentication and each role's access.
- [ ] Test booking, slot capacity and package/test price calculation end to end.
- [ ] Test private report upload/download and authorization.
- [ ] Test chatbot, prescription workflow and report explainer with safety/consent checks.
- [ ] Export and add the Postman collection and project plan/handover notes.
- [ ] Add the 8–10 minute demo video under `demo/` (under 100 MB) and upload it to Google Classroom. **This video is not included in the current package.**
- [ ] Add the team PPT to `docs/presentation/` and upload it to GitHub and Google Classroom.
- [ ] Complete and submit the Team B form on Google Classroom.

---

**Project note:** This README is a submission-ready replacement draft prepared from the project brief and the implementation details available to the team. Before merging it into `main`, compare the environment-variable names and API route list against the latest `server/.env.example`, `server/index.js`, route files and `docs/API_DOCUMENTATION.md`.
