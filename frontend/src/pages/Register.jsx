import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { UserPlus, User, Mail, Lock, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';
import api from '../services/api.js';
import { addNotification } from '../redux/slices/uiSlice.js';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'customer',
    },
  });

  const passwordVal = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError(null);

    // Omit confirmPassword field for API registration request
    const registerPayload = { ...data };
    delete registerPayload.confirmPassword;

    try {
      await api.post('/api/auth/register', registerPayload);
      
      // Dispatch success notification
      dispatch(
        addNotification({
          type: 'success',
          message: 'Account registered successfully! Please log in.',
        })
      );
      
      // Redirect to Login page on success
      navigate('/login');
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Registration failed. Please check the fields and try again.';
      setServerError(errorMessage);
      dispatch(
        addNotification({
          type: 'error',
          message: errorMessage,
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

        {/* Heading */}
        <div className="text-center space-y-2 mb-8">
          <div className="bg-indigo-500/10 text-indigo-400 p-3 rounded-full w-fit mx-auto border border-indigo-500/20">
            <UserPlus className="h-6 w-6" />
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-100">
            Create Account
          </h2>
          <p className="text-slate-400 text-sm">
            Sign up to get support or manage ticketing flows
          </p>
        </div>

        {/* Server error box */}
        {serverError && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>{serverError}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="John Doe"
                className={`w-full bg-slate-900 border ${
                  errors.name ? 'border-red-500' : 'border-slate-800'
                } rounded-lg pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all`}
                {...register('name', { required: 'Name is required' })}
              />
            </div>
            {errors.name && (
              <span className="text-xs text-red-400 font-medium block mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

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
                } rounded-lg pl-10 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all`}
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

          {/* Role select (convenient testing parameter) */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Account Role</label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <select
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
                {...register('role')}
              >
                <option value="customer">Customer (User)</option>
                <option value="support">Support Agent</option>
                <option value="admin">Administrator</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 6 characters"
                className={`w-full bg-slate-900 border ${
                  errors.password ? 'border-red-500' : 'border-slate-800'
                } rounded-lg pl-10 pr-10 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all`}
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

          {/* Confirm Password input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 block">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter password"
                className={`w-full bg-slate-900 border ${
                  errors.confirmPassword ? 'border-red-500' : 'border-slate-800'
                } rounded-lg pl-10 pr-10 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all`}
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (val) => val === passwordVal || 'Passwords do not match',
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-xs text-red-400 font-medium block mt-1">
                {errors.confirmPassword.message}
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
                Registering account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Footer info link */}
        <div className="text-center text-xs text-slate-400 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
