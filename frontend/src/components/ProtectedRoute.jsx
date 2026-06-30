import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShieldAlert } from 'lucide-react';

/**
 * Route guard component protecting private client pages.
 * @param {React.ReactNode} children - Nested component to display if validation passes
 * @param {Array<string>} allowedRoles - Specific roles permitted to access (e.g. ['admin', 'support'])
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  // If auth state is still loading from localStorage or boot check, display simple loader
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-slate-400">Verifying credentials...</p>
      </div>
    );
  }

  // Redirect to login if user is unauthenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Handle role-based validation
  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 space-y-6 max-w-md mx-auto">
        <div className="bg-red-500/10 text-red-400 p-4 rounded-full shadow-lg border border-red-500/20">
          <ShieldAlert className="h-10 w-10 animate-bounce" />
        </div>
        <h2 className="font-display text-2xl font-extrabold text-red-400">
          Access Denied
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Your account role (<span className="text-slate-200 font-semibold">{user.role}</span>) does not have permission to view this resource. Contact a systems administrator if you believe this is an error.
        </p>
        <Navigate to="/" replace />
      </div>
    );
  }

  return children;
}
