import { Routes, Route, Navigate } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout.jsx';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

// Simple placeholder page for views that will be built in subsequent phases
function PlaceholderPage({ title, description, badge }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
        {badge}
      </div>
      <h2 className="font-display text-3xl font-extrabold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
        {title}
      </h2>
      <p className="text-slate-400 max-w-md">
        {description}
      </p>
      <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* Main views (Protected) */}
        <Route
          index
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Public authentication views */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Support and about placeholders */}
        <Route
          path="support"
          element={
            <ProtectedRoute>
              <PlaceholderPage
                title="Customer Support Desk"
                description="Interactive FAQ search, chatbot widget, and ticket submission forms are scheduled for development in Phase 4 & 5."
                badge="Phase 4 & 5 Feature"
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="about"
          element={
            <PlaceholderPage
              title="About SmartHelp AI"
              description="An enterprise helpdesk powered by Fastify, React, Redux Toolkit, and Groq LLM pipelines for automated customer assistance."
              badge="Project Overview"
            />
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
