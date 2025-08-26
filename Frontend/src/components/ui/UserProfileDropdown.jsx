import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const UserProfileDropdown = ({ user = null, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Default user data
  const defaultUser = {
    name: 'John Doe',
    email: 'john.doe@restaurant.com',
    role: 'Manager',
    avatar: null,
  };

  const currentUser = user || defaultUser;

  const menuItems = [
    {
      label: 'Profile',
      path: '/profile',
      icon: 'User',
      description: 'Manage your account'
    },
    {
      label: 'Account Settings',
      path: '/account-settings',
      icon: 'Settings',
      description: 'Privacy and security'
    },
    {
      label: 'Preferences',
      path: '/preferences',
      icon: 'Sliders',
      description: 'Customize your experience'
    },
    {
      label: 'Notifications',
      path: '/notifications',
      icon: 'Bell',
      description: 'Manage alerts'
    },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (path) => {
    setIsOpen(false);
    window.location.href = path;
  };

  const handleLogout = () => {
    setIsOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      console.log('Logout clicked');
      // Default logout behavior
      window.location.href = '/login';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={handleToggle}
        className="flex items-center gap-3 px-3 py-2 h-auto"
      >
        {/* Avatar */}
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center overflow-hidden">
          {currentUser?.avatar ? (
            <img 
              src={currentUser?.avatar} 
              alt={currentUser?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="User" size={16} color="white" />
          )}
        </div>

        {/* User Info */}
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-foreground">
            {currentUser?.name}
          </div>
          <div className="text-xs text-text-secondary">
            {currentUser?.role}
          </div>
        </div>

        {/* Chevron */}
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-text-secondary transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-popover border border-border rounded-lg shadow-elevation-3 py-2 animate-fade-in z-50">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                {currentUser?.avatar ? (
                  <img 
                    src={currentUser?.avatar} 
                    alt={currentUser?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={20} color="white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-popover-foreground truncate">
                  {currentUser?.name}
                </div>
                <div className="text-xs text-text-secondary truncate">
                  {currentUser?.email}
                </div>
                <div className="text-xs text-primary font-medium">
                  {currentUser?.role}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleMenuItemClick(item?.path)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-muted transition-colors duration-200 group"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Icon 
                    name={item?.icon} 
                    size={16} 
                    className="text-text-secondary group-hover:text-foreground transition-colors duration-200"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-popover-foreground">
                    {item?.label}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {item?.description}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border my-2"></div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-muted transition-colors duration-200 group"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <Icon 
                name="LogOut" 
                size={16} 
                className="text-error group-hover:text-error transition-colors duration-200"
              />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-error">
                Sign out
              </div>
              <div className="text-xs text-text-secondary">
                Sign out of your account
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;