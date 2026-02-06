import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useIsAuthenticated, useMe } from '../auth';
import { authService } from '../services';
import { disconnectEcho, getEcho } from '../realtime';

interface HeaderProps {
  variant?: 'light' | 'dark';
}

export default function Header({ variant = 'light' }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isAuthenticated = useIsAuthenticated();
  const { user } = useMe();
  const [hasRealtimeEnrollmentPing, setHasRealtimeEnrollmentPing] = useState(false);
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/courses' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact US', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/courses') {
      return location.pathname === '/courses' || location.pathname.startsWith('/course/');
    }
    return location.pathname === path;
  };

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      setHasRealtimeEnrollmentPing(false);
    }
  }, [location.pathname]);

  const textColor = variant === 'dark' ? 'text-white' : 'text-[#8a948c]';
  const activeColor = 'text-[#f98149]';
  const logoSrc = '/images/logo.png';

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await authService.logout();
    } catch {
      // ignore
    } finally {
      setIsLoggingOut(false);
      setIsMobileMenuOpen(false);
      disconnectEcho();
      navigate('/login');
    }
  };

  // Subscribe teachers to their private notifications channel.
  // Uses Laravel's built-in notification broadcast channel: private-App.Models.User.{id}
  // and Echo's `.notification(...)` helper.
  useEffect(() => {
    if (!isAuthenticated) return;
    if (!user || user.role !== 'teacher') return;

    const echo = getEcho();
    if (!echo) return;

    const channelName = `App.Models.User.${user.id}`;
    const channel = echo.private(channelName);

    channel.notification(() => {
      setHasRealtimeEnrollmentPing(true);
      window.dispatchEvent(new Event('enrollments:changed'));
    });

    return () => {
      try {
        echo.leave(channelName);
      } catch {
        // ignore
      }
    };
  }, [isAuthenticated, user?.id, user?.role]);

  return (
    <header className="w-full px-4 md:px-8 lg:px-[82px] py-4 md:py-8 lg:py-[78px] absolute top-0 left-0 z-50">
      <div className="flex items-center justify-between max-w-[1920px] mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img 
            src={logoSrc} 
            alt="EZY Skills" 
            className="h-[60px] md:h-[80px] lg:h-[118px] w-auto object-contain"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden p-2 ${variant === 'dark' ? 'text-white' : 'text-[#003f7d]'}`}
        >
          {isMobileMenuOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`font-poppins text-base xl:text-[22px] font-medium transition-colors hover:text-[#f98149] whitespace-nowrap ${
                isActive(item.path) ? activeColor : textColor
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={
                  variant === 'dark'
                    ? 'px-4 xl:px-8 py-2 xl:py-4 border-2 border-white rounded-lg text-white font-poppins text-sm xl:text-[18px] font-semibold tracking-[0.5px] hover:bg-white hover:text-[#003f7d] transition-colors'
                    : 'px-4 xl:px-8 py-2 xl:py-4 border-2 border-[#003f7d] rounded-lg text-[#003f7d] font-poppins text-sm xl:text-[18px] font-semibold tracking-[0.5px] hover:bg-[#003f7d] hover:text-white transition-colors'
                }
              >
                <span className="inline-flex items-center gap-2">
                  Dashboard
                  {hasRealtimeEnrollmentPing && user?.role === 'teacher' && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f98149]" />
                  )}
                </span>
              </Link>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={
                  variant === 'dark'
                    ? 'px-4 xl:px-8 py-2 xl:py-4 border-2 border-white rounded-lg text-white font-poppins text-sm xl:text-[18px] font-semibold tracking-[0.5px] hover:bg-white hover:text-[#003f7d] transition-colors disabled:opacity-60'
                    : 'px-4 xl:px-8 py-2 xl:py-4 border-2 border-[#f98149] rounded-lg text-[#f98149] font-poppins text-sm xl:text-[18px] font-semibold tracking-[0.5px] hover:bg-[#f98149] hover:text-white transition-colors disabled:opacity-60'
                }
              >
                {isLoggingOut ? 'Logging out…' : 'Logout'}
              </button>
            </>
          ) : variant === 'dark' ? (
            <>
              <Link
                to="/login"
                className="px-4 xl:px-8 py-2 xl:py-4 border-2 border-white rounded-lg text-white font-poppins text-sm xl:text-[18px] font-semibold tracking-[0.5px] hover:bg-white hover:text-[#003f7d] transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-4 xl:px-8 py-2 xl:py-4 bg-white rounded-lg text-[#2e343d] font-poppins text-sm xl:text-[18px] font-semibold hover:bg-gray-100 transition-colors"
              >
                Create Account
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 xl:px-8 py-2 xl:py-4 border-2 border-[#f98149] rounded-lg text-[#f98149] font-poppins text-sm xl:text-[18px] font-semibold tracking-[0.5px] hover:bg-[#f98149] hover:text-white transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 xl:px-8 py-2 xl:py-4 bg-[#f98149] rounded-lg text-white font-poppins text-sm xl:text-[18px] font-semibold hover:bg-[#e6733d] transition-colors"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden absolute top-full left-0 w-full ${variant === 'dark' ? 'bg-[#003f7d]' : 'bg-white'} shadow-lg z-50`}>
          <nav className="flex flex-col p-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-poppins text-lg font-medium py-3 transition-colors hover:text-[#f98149] border-b ${variant === 'dark' ? 'border-white/20' : 'border-gray-200'} ${
                  isActive(item.path) ? activeColor : textColor
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4 pt-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setHasRealtimeEnrollmentPing(false);
                    }}
                    className={
                      variant === 'dark'
                        ? 'w-full px-6 py-3 border-2 border-white rounded-lg text-white font-poppins text-base font-semibold text-center hover:bg-white hover:text-[#003f7d] transition-colors'
                        : 'w-full px-6 py-3 border-2 border-[#003f7d] rounded-lg text-[#003f7d] font-poppins text-base font-semibold text-center hover:bg-[#003f7d] hover:text-white transition-colors'
                    }
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      Dashboard
                      {hasRealtimeEnrollmentPing && user?.role === 'teacher' && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#f98149]" />
                      )}
                    </span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={
                      variant === 'dark'
                        ? 'w-full px-6 py-3 border-2 border-white rounded-lg text-white font-poppins text-base font-semibold text-center hover:bg-white hover:text-[#003f7d] transition-colors disabled:opacity-60'
                        : 'w-full px-6 py-3 border-2 border-[#f98149] rounded-lg text-[#f98149] font-poppins text-base font-semibold text-center hover:bg-[#f98149] hover:text-white transition-colors disabled:opacity-60'
                    }
                  >
                    {isLoggingOut ? 'Logging out…' : 'Logout'}
                  </button>
                </>
              ) : variant === 'dark' ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-6 py-3 border-2 border-white rounded-lg text-white font-poppins text-base font-semibold text-center hover:bg-white hover:text-[#003f7d] transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-6 py-3 bg-white rounded-lg text-[#2e343d] font-poppins text-base font-semibold text-center hover:bg-gray-100 transition-colors"
                  >
                    Create Account
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-6 py-3 border-2 border-[#f98149] rounded-lg text-[#f98149] font-poppins text-base font-semibold text-center hover:bg-[#f98149] hover:text-white transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full px-6 py-3 bg-[#f98149] rounded-lg text-white font-poppins text-base font-semibold text-center hover:bg-[#e6733d] transition-colors"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
