# MeetGate React Frontend

The first frontend development phase for the **Online Meeting Gateway System Using Zoom**.

## Completed in this phase

- React + Vite project setup
- Homepage converted into reusable React components
- React Router configuration
- Responsive navigation
- Modern premium academic design
- Project overview and objectives
- Features section
- Community phone and laptop section
- System architecture
- Workflow
- Security section
- Functional meeting-code validation demo
- FAQ accordion
- Responsive mobile design
- 404 page
- Environment-variable template

## Project structure

```text
meetgate-react-frontend/
├── public/
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── CommunitySection.jsx
│   │   ├── FAQ.jsx
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── JoinMeeting.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectOverview.jsx
│   │   ├── Security.jsx
│   │   ├── SystemArchitecture.jsx
│   │   └── Workflow.jsx
│   ├── data/
│   │   └── homeData.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── styles/
│   │   ├── global.css
│   │   ├── home.css
│   │   ├── responsive.css
│   │   └── variables.css
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

## Requirements

Install Node.js **20.19 or newer**. React Router 7 supports Node.js 20+.

Check your installation:

```bash
node --version
npm --version
```

## Run the project

Open the project folder in Visual Studio Code, then run:

```bash
npm install
npm run dev
```

Vite will normally open:

```text
http://localhost:5173
```

## Production build

```bash
npm run build
npm run preview
```

## Backend configuration later

Copy `.env.example` to `.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Do not place the Zoom secret or backend passwords in a `VITE_` environment variable. Anything beginning with `VITE_` can be exposed to the browser.

## Next development phase

The next page should be the authentication flow:

1. Login page
2. Registration page
3. Shared authentication layout
4. Form validation
5. API service structure
