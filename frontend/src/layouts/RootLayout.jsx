import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X, Bot, LogOut, User } from 'lucide-react';
import { logout as authLogout } from '../redux/slices/authSlice.js';
import { addNotification } from '../redux/slices/uiSlice.js';

export default function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(authLogout());
    dispatch(
      addNotification({
        type: 'info',
        message: 'Successfully logged out.',
      })
    );
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-glow-1"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-glow-2"></div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 glass-panel shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 cursor-pointer">
              <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-md flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                SmartHelp
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                Home
              </Link>
              {isAuthenticated && (
                <Link to="/support" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                  Support
                </Link>
              )}
              <Link to="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                About
              </Link>
              {!isAuthenticated && (
                <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                  Login
                </Link>
              )}
            </nav>

            {/* Right Action Button or Profile info */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/80">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-5 h-5 rounded-full object-cover" />
                    ) : (
                      <User className="h-4 w-4 text-indigo-400" />
                    )}
                    <span className="text-xs text-slate-300 font-medium max-w-[120px] truncate">{user?.name}</span>
                    <span className="text-[10px] uppercase font-bold bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded text-indigo-400">
                      {user?.role}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-900 text-red-400 hover:text-red-300 shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Launch Demo
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-t border-slate-800/80 px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link
                to="/support"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
              >
                Support
              </Link>
            )}
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
            >
              About
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
              >
                Login
              </Link>
            )}
            <div className="pt-2 border-t border-slate-800">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-3 py-2 text-slate-300 text-sm">
                    <User className="h-4 w-4 text-indigo-400" />
                    <span>{user?.name} ({user?.role})</span>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-red-950/20 border border-red-900/30 text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                >
                  Launch Demo
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-900 py-8 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:flex md:justify-between md:items-center">
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} SmartHelp AI Inc. All rights reserved.
          </div>
          <div className="flex justify-center space-x-6 mt-4 md:mt-0 text-sm text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors duration-200">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors duration-200">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors duration-200">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
