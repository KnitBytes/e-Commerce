import { useCart } from '../Pages/Cart/CartContext';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { notification, clearNotification, getTotalItems } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (location.state?.message) {
      setToastMessage(location.state.message);
  
      // Set a timer to clear the toast and replace state after 4 seconds
      const timer = setTimeout(() => {
        setToastMessage('');
        navigate(location.pathname, { replace: true, state: {} });
      }, 2000);
  
      // Cleanup the timer if the component re-renders before the timer completes
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  // Authentication state management
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token') || 
                    localStorage.getItem('authToken') || 
                    sessionStorage.getItem('authToken');
      
      // Check if user is admin
      let isUserAdmin = false;
      if (token) {
        const userData = localStorage.getItem('user');
        if (userData) {
          try {
            const parsedUser = JSON.parse(userData);
            isUserAdmin = parsedUser.role === 'admin';
          } catch (e) {
            console.error('Error parsing user data:', e);
          }
        }
      }
      
      setIsAuthenticated(!!token);
      setIsAdmin(isUserAdmin);
      return !!token;
    };
    
    checkAuthStatus();
    const intervalCheck = setInterval(checkAuthStatus, 1000);
    
    window.addEventListener('auth-state-change', checkAuthStatus);
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      clearInterval(intervalCheck);
      window.removeEventListener('auth-state-change', checkAuthStatus);
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  // Cart notification handling
  useEffect(() => {
    if (notification) {
      setShowPopup(true);
      const timeout = setTimeout(() => {
        setShowPopup(false);
        clearNotification();
      }, 2500);
      return () => clearTimeout(timeout);
    }
  }, [notification, clearNotification]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setDropdownOpen(false);
    navigate('/');
    window.dispatchEvent(new Event('auth-state-change'));
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/Products' },
    { name: 'Categories', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      {/* Success Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50">
          <div className="bg-white border border-green-200 shadow-xl rounded-lg px-4 py-3 flex items-center space-x-3 animate-fadeIn">
            <div className="bg-green-100 p-2 rounded-full">
              <svg 
                className="w-5 h-5 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <Link to="/">
              <img src="/images/logo1.png" alt="Logo" className="h-9 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 hover:text-green-700 font-medium text-sm transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
              />
              <button className="absolute right-3 top-2.5 text-gray-500 hover:text-green-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Icons Section */}
          <div className="hidden md:flex items-center space-x-5 ml-4 relative">
            {/* Account Dropdown */}
            <div className="relative">
              <button 
                onClick={() => {
                  if (isAuthenticated) {
                    if (isAdmin) {
                      setDropdownOpen(!dropdownOpen);
                      // Alternative: navigate('/Admin');
                    } else {
                      setDropdownOpen(!dropdownOpen);
                    }
                  } else {
                    navigate('/login');
                  }
                }}
                className="p-2 text-gray-600 hover:text-green-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              
              {isAuthenticated && dropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                  {!isAdmin && (
                    <Link 
                      to="/user" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      View Profile
                    </Link>
                  )}
                  {isAdmin && (
                    <Link 
                      to="/Admin" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-green-700 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
              {showPopup && notification && (
                <div className="absolute top-full mt-2 right-0 bg-green-100 border border-green-400 text-green-700 text-sm px-4 py-2 rounded shadow-md z-50 whitespace-nowrap">
                  {notification.action === 'added' ? (
                    <span>{notification.name} added to cart!</span>
                  ) : (
                    <span>Cart updated: {notification.name} quantity increased</span>
                  )}
                </div>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-green-700"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-700 hover:text-green-700 px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex space-x-4 px-4 py-2">
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    {!isAdmin && (
                      <Link to="/user" className="text-gray-700 flex items-center" onClick={() => setIsMenuOpen(false)}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Account
                      </Link>
                    )}
                    {isAdmin && (
                      <Link to="/Admin" className="text-gray-700 flex items-center" onClick={() => setIsMenuOpen(false)}>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={logout}
                      className="text-gray-700 flex items-center w-full text-left"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="text-gray-700 flex items-center" onClick={() => setIsMenuOpen(false)}>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Login
                  </Link>
                )}
                <Link to="/cart" className="text-gray-700 flex items-center relative" onClick={() => setIsMenuOpen(false)}>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Cart
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 left-3 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;