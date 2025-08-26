import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginBackground from './components/LoginBackground';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <LoginHeader />
          <div className="bg-card border border-border rounded-xl shadow-lg p-8">
            <LoginForm />
          </div>
          
          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-text-secondary">
              © {new Date()?.getFullYear()} CATE Food Manager. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      {/* Right Side - Background Image */}
      <LoginBackground />
    </div>
  );
};

export default Login;