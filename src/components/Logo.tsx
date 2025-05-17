
import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <Link to="/" className="flex items-center">
      <span className={`font-bold ${sizeClasses[size]} text-white`}>
        Stream<span className="text-streamr-blue">R</span>
      </span>
    </Link>
  );
};

export default Logo;
