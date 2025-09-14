import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex items-center space-x-4">
      {user && (
        <span className="text-sm text-gray-600">
          Welcome, {user.name}
        </span>
      )}
      <Button
        onClick={handleLogout}
        variant="outline"
        className="rounded-full"
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
