
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-streamr-dark">
      <div className="container mx-auto px-4 py-6">
        <Logo size="lg" />
      </div>
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
          <p className="text-xl text-streamr-gray mb-6">
            Oops! This track doesn't exist
          </p>
          <Link 
            to="/" 
            className="text-streamr-blue hover:text-streamr-blue/80 underline"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
