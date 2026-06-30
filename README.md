# AI Smart Helpdesk Assistant for Automated Customer Support

This repository houses the **AI Smart Helpdesk Assistant for Automated Customer Support**, a production-ready, full-stack application designed to optimize support operations. 

It provides an automated ticketing system, AI-driven classification, smart ticket routing, FAQ recommendations, and an automated AI chatbot, backed by a comprehensive admin dashboard with real-time analytics.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (v18+)
- **Vite** (Next-generation frontend tooling)
- **Tailwind CSS** (v4.0 utility-first CSS framework with native compilation)
- **Redux Toolkit** (State management)
- **React Router DOM** (Single-page app routing)

### Backend
- **Node.js** (v18+)
- **Fastify** (High performance, low overhead web framework)

### Database & Security
- **MongoDB** (Object data modeling via Mongoose)
- **JWT** (JSON Web Tokens for user and agent authentication - *Structure setup ready*)

### Future Integrations
- **Groq API** (High-speed LLM inference for ticket classification, routing, and chatbot replies)

---

## 📂 Project Structure

```text
AI-smartHelpDesk/
├── docs/                     # Design, architecture, and developer documentation
├── backend/                  # Fastify backend application
│   ├── src/
│   │   ├── config/           # Database configuration and server settings
│   │   ├── controllers/      # Route request/response handlers
│   │   ├── middleware/       # Custom Fastify hooks and middleware
│   │   ├── models/           # Mongoose schemas (Data layer)
│   │   ├── plugins/          # Fastify plugins (CORS, JWT etc)
│   │   ├── routes/           # Endpoint path configurations
│   │   ├── services/         # Core business logic and external APIs
│   │   ├── utils/            # Shared helper functions
│   │   ├── app.js            # Fastify application logic registration
│   │   └── server.js         # Entrypoint server execution script
│   ├── .env.example          # Sample environment configurations for backend
│   └── package.json          # Node dependencies and execution scripts
├── frontend/                 # React + Vite frontend application
│   ├── src/
│   │   ├── assets/           # Static media assets, icons, and logos
│   │   ├── components/       # Reusable React UI components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── layouts/          # Page wrapping components (Root, Dashboard, etc.)
│   │   ├── pages/            # View components mapping to routes
│   │   ├── redux/            # Store configurations and slices
│   │   ├── routes/           # Route definitions and configuration mapping
│   │   ├── services/         # API abstraction layer (Axios clients)
│   │   ├── utils/            # Helper files and constants
│   │   ├── index.css         # Global Tailwind directives & styles
│   │   └── main.jsx          # React app entry root point
│   ├── jsconfig.json         # Absolute import mappings (@/* -> src/*)
│   ├── vite.config.js        # Vite + Tailwind compiler settings
│   ├── .env.example          # Sample environment configurations for frontend
│   └── package.json          # Frontend packages and scripts
├── .gitignore                # Global git ignored directories/files
└── README.md                 # Main workspace documentation
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher) or Yarn

---

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in the required details:
   ```bash
   cp .env.example .env
   ```
4. Start the development server (runs on port `5000` by default):
   ```bash
   npm run dev
   ```
5. Verify status by requesting the health check:
   ```bash
   curl http://localhost:5000/health
   ```

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Start the Vite development server (runs on `http://localhost:5173`):
   ```bash
   npm run dev
   ```

---

## 🗺️ Roadmap (Multi-Phase Scope)

1. **Phase 1: Project Foundation** (Current Module) - Base structure, styling, routing, and configurations.
2. **Phase 2: Authentication** - Registration, login, role-based controls (User, Agent, Admin), and JWT.
3. **Phase 3: User Dashboard** - Ticket creation interface and simple user dashboard.
4. **Phase 4: AI Chatbot + FAQ** - Interactive chat, RAG, and FAQ management.
5. **Phase 5: Ticket Management** - Agent ticket queues, search, sorting, and lifecycle management.
6. **Phase 6: AI Ticket Classification & Routing** - Automatic classification, prioritization, and assignment using Groq LLM APIs.
7. **Phase 7: Admin Dashboard** - System control, user/agent management, and audit trails.
8. **Phase 8: Analytics & Reports** - Real-time statistics, graphs, and performance KPIs.
9. **Phase 9: Testing & Optimization** - E2E tests, caching, and database indexing.
10. **Phase 10: Deployment & Final Integration** - CI/CD, production environments (Vercel & Render).
