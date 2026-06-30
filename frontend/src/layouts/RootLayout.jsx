import { Link, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Bot, Shield, HelpCircle, Activity } from 'lucide-react';

export default function RootLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-md flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                SmartHelp
              </span>
            </div>

            {/* Desktop Navigation Links Placeholders */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                Home
              </Link>
              <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                Login
              </Link>
              <Link to="/support" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                Support
              </Link>
              <Link to="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200">
                About
              </Link>
            </nav>

            {/* Right Action Button Placeholder */}
            <div className="hidden md:block">
              <button className="px-4 py-2 text-xs font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
                Launch Demo
              </button>
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
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
            >
              Login
            </Link>
            <Link
              to="/support"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
            >
              Support
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/60"
            >
              About
            </Link>
            <div className="pt-2 border-t border-slate-800">
              <button className="w-full px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
                Launch Demo
              </button>
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
