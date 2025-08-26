import React from 'react';
import Image from '../../../components/AppImage';

const LoginBackground = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
          alt="Restaurant interior with modern dining setup"
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-12 text-white">
        <div className="max-w-md">
          <h3 className="text-3xl font-bold mb-6">
            Streamline Your Restaurant Operations
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Manage your food inventory, track orders, and optimize your menu with our comprehensive restaurant management system.
          </p>
          
          {/* Features List */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">✓</span>
              </div>
              <span className="text-white/90">Complete food inventory management</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">✓</span>
              </div>
              <span className="text-white/90">Real-time order tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">✓</span>
              </div>
              <span className="text-white/90">Customer management system</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">✓</span>
              </div>
              <span className="text-white/90">Analytics and reporting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-20 right-20 w-12 h-12 bg-white/10 rounded-full"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-white/20 rounded-full"></div>
    </div>
  );
};

export default LoginBackground;