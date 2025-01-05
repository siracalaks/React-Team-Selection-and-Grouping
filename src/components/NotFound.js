import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="container">
      <div className="row justify-content-center mt-4">
        <div className="col-8 text-center">
          <h1 className="display-4">404 - Page Not Found</h1>
          <p className="lead">Sorry, the page you are looking for does not exist.</p>
          <Link to="/" className="btn btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound; 