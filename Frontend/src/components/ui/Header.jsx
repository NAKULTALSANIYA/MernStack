import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
    { label: 'Food Items', path: '/food-details', icon: 'UtensilsCrossed' },
    { label: 'Orders', path: '/orders', icon: 'ShoppingCart' },
    { label: 'Customers', path: '/customers', icon: 'Users' },
  ];

  const moreMenuItems = [
    { label: 'Reviews', path: '/reviews', icon: 'Star' },
    { label: 'Wallet', path: '/wallet', icon: 'Wallet' },
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
  ];

  const isActivePath = (path) => {
    if (path === '/') return location?.pathname === '/';
    return location?.pathname?.startsWith(path);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logout clicked');
  };

  return (
    <header className="bg-white border-b border-border h-16 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left Section - Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="UtensilsCrossed" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              CATE Food Manager
            </span>
          </div>
        </div>

        {/* Center Section - Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigationItems?.map((item) => (
            <a
              key={item?.path}
              href={item?.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              {item?.label}
            </a>
          ))}

          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2"
            >
              <Icon name="MoreHorizontal" size={16} />
              More
            </Button>

            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-elevation-2 py-1 animate-fade-in">
                {moreMenuItems?.map((item) => (
                  <a
                    key={item?.path}
                    href={item?.path}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Icon name={item?.icon} size={16} />
                    {item?.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Section - User Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
          </Button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={handleProfileToggle}
              className="flex items-center gap-2 px-3 py-2"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-foreground">John Doe</div>
                <div className="text-xs text-text-secondary">Manager</div>
              </div>
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </Button>

            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-1 w-56 bg-popover border border-border rounded-md shadow-elevation-2 py-1 animate-fade-in">
                <div className="px-3 py-2 border-b border-border">
                  <div className="text-sm font-medium text-popover-foreground">John Doe</div>
                  <div className="text-xs text-text-secondary">john.doe@restaurant.com</div>
                </div>
                
                <a
                  href="/profile"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                >
                  <Icon name="User" size={16} />
                  Profile
                </a>
                
                <a
                  href="/settings"
                  className="flex items-center gap-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                >
                  <Icon name="Settings" size={16} />
                  Settings
                </a>
                
                <div className="border-t border-border my-1"></div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2 text-sm text-error hover:bg-muted transition-colors duration-200 w-full text-left"
                >
                  <Icon name="LogOut" size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;