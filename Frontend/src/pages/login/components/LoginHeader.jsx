import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
          <Icon name="UtensilsCrossed" size={28} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-foreground">CATE</h1>
          <p className="text-sm text-text-secondary font-medium">Food Manager</p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Welcome Back
        </h2>
        <p className="text-text-secondary">
          Sign in to your account to manage your restaurant
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;