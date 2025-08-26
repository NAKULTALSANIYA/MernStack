import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isOpen = false, onClose }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/', 
      icon: 'LayoutDashboard',
      badge: null
    },
    { 
      label: 'Food Management', 
      path: '/food-details', 
      icon: 'UtensilsCrossed',
      badge: null,
      children: [
        { label: 'All Items', path: '/food-details', icon: 'List' },
        { label: 'Add New Item', path: '/add-edit-food-item', icon: 'Plus' },
        { label: 'Categories', path: '/categories', icon: 'Tag' },
      ]
    },
    { 
      label: 'Orders', 
      path: '/orders', 
      icon: 'ShoppingCart',
      badge: { count: 5, type: 'primary' }
    },
    { 
      label: 'Customers', 
      path: '/customers', 
      icon: 'Users',
      badge: null
    },
    { 
      label: 'Reviews', 
      path: '/reviews', 
      icon: 'Star',
      badge: { count: 2, type: 'warning' }
    },
    { 
      label: 'Wallet', 
      path: '/wallet', 
      icon: 'Wallet',
      badge: null
    },
  ];

  const bottomMenuItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help & Support', path: '/help', icon: 'HelpCircle' },
  ];

  const [expandedItems, setExpandedItems] = useState({});

  const isActivePath = (path) => {
    if (path === '/') return location?.pathname === '/';
    return location?.pathname?.startsWith(path);
  };

  const toggleExpanded = (path) => {
    setExpandedItems(prev => ({
      ...prev,
      [path]: !prev?.[path]
    }));
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const renderBadge = (badge) => {
    if (!badge) return null;
    
    const badgeClasses = {
      primary: 'bg-primary text-primary-foreground',
      warning: 'bg-warning text-warning-foreground',
      error: 'bg-error text-error-foreground',
      success: 'bg-success text-success-foreground',
    };

    return (
      <span className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full ${badgeClasses?.[badge?.type] || badgeClasses?.primary}`}>
        {badge?.count}
      </span>
    );
  };

  const renderNavigationItem = (item, isChild = false) => {
    const isActive = isActivePath(item?.path);
    const hasChildren = item?.children && item?.children?.length > 0;
    const isExpanded = expandedItems?.[item?.path];

    return (
      <div key={item?.path}>
        <div
          className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 ${
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'text-text-secondary hover:text-foreground hover:bg-muted'
          } ${isChild ? 'ml-6' : ''}`}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item?.path);
            } else {
              window.location.href = item?.path;
              if (onClose) onClose();
            }
          }}
        >
          <div className="flex items-center gap-3 flex-1">
            <Icon name={item?.icon} size={18} />
            <span className="text-sm font-medium">{item?.label}</span>
            {renderBadge(item?.badge)}
          </div>
          
          {hasChildren && (
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            />
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1 animate-slide-in">
            {item?.children?.map(child => renderNavigationItem(child, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-60 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:fixed
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="UtensilsCrossed" size={20} color="white" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                CATE Food Manager
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems?.map(item => renderNavigationItem(item))}
          </nav>

          {/* Bottom Section */}
          <div className="border-t border-border">
            {/* Bottom Menu Items */}
            <div className="p-4 space-y-2">
              {bottomMenuItems?.map(item => renderNavigationItem(item))}
            </div>

            {/* User Profile */}
            <div className="p-4 border-t border-border">
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={handleProfileToggle}
                  className="w-full justify-start gap-3 p-3"
                >
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={16} color="white" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-foreground">John Doe</div>
                    <div className="text-xs text-text-secondary">Manager</div>
                  </div>
                  <Icon name="ChevronUp" size={16} className="text-text-secondary" />
                </Button>

                {isProfileOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-1 bg-popover border border-border rounded-md shadow-elevation-2 py-1 animate-fade-in">
                    <a
                      href="/profile"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                    >
                      <Icon name="User" size={16} />
                      Profile
                    </a>
                    
                    <a
                      href="/account"
                      className="flex items-center gap-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                    >
                      <Icon name="Settings" size={16} />
                      Account Settings
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
        </div>
      </aside>
    </>
  );
};

export default Sidebar;