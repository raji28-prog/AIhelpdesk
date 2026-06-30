import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import api from '../services/api.js';
import { authStart, authSuccess, authFailure, clearError } from '../redux/slices/authSlice.js';
import { addNotification } from '../redux/slices/uiSlice.js';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Determine redirection path (defaults to home page)
  const fromPath = location.state?.from?.pathname || '/';

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Redirect instantly if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(fromPath, { replace: true });
    }
    // Clear any leftover auth errors upon visiting login page
    dispatch(clearError());
  }, [isAuthenticated, navigate, fromPath, dispatch]);

  const onSubmit = async (data) => {
    dispatch(authStart());
    try {
      const response = await api.post('/api/auth/login', data);
      const { user, token } = response.data.data;

      // Update Redux state and localStorage
      dispatch(authSuccess({ user, token }));

      // Dispatch UI notification toast
      dispatch(
        addNotification({
          type: 'success',
          message: `Welcome back, ${user.name}!`,
        })
      );

      navigate(fromPath, { replace: true });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Login failed. Please verify your credentials.';
      dispatch(authFailure(errorMessage));
      dispatch(
        addNotification({
          type: 'error',
          message: errorMessage,
        })
      );
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

        {/* Heading */}
        <div className="text-center space-y-2 mb-8">
          <div className="bg-indigo-500/10 text-indigo-400 p-3 rounded-full w-fit mx-auto border border-indigo-500/20">
            <LogIn className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-100">
            Welcome Back
          </h2>
          <p className="text-slate-400 text-sm">
            Sign in to access your helpdesk dashboard
          </p>
        </div>

        {/* Server error box */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className={`w-full bg-slate-900 border ${
                  errors.email ? 'border-red-500' : 'border-slate-800'
                } rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: 'Please fill a valid email address',
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className="text-xs text-red-400 font-medium block mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <span className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full bg-slate-900 border ${
                  errors.password ? 'border-red-500' : 'border-slate-800'
                } rounded-lg pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all`}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && (
              <span className="text-xs text-red-400 font-medium block mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer info link */}
        <div className="text-center text-xs text-slate-400 mt-8">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
