import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ items = null }) => {
  const location = useLocation();

  // Auto-generate breadcrumbs if not provided
  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Dashboard', path: '/' }];

    // Route mapping for better labels
    const routeLabels = {
      'food-details': 'Food Details',
      'add-edit-food-item': 'Add Food Item',
      'orders': 'Orders',
      'customers': 'Customers',
      'reviews': 'Reviews',
      'wallet': 'Wallet',
      'settings': 'Settings',
      'help': 'Help & Support',
      'profile': 'Profile',
      'categories': 'Categories',
    };

    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const label = routeLabels?.[segment] || segment?.charAt(0)?.toUpperCase() + segment?.slice(1);
      
      breadcrumbs?.push({
        label,
        path: currentPath,
        isLast: index === pathSegments?.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (location?.pathname === '/') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-text-secondary mb-6">
      {breadcrumbItems?.map((item, index) => (
        <div key={item?.path} className="flex items-center">
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="mx-2 text-border" />
          )}
          
          {item?.isLast || index === breadcrumbItems?.length - 1 ? (
            <span className="text-foreground font-medium">
              {item?.label}
            </span>
          ) : (
            <a
              href={item?.path}
              className="hover:text-foreground transition-colors duration-200"
            >
              {item?.label}
            </a>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;