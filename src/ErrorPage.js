import React from 'react';

function ErrorPage({ errorMessage }) {
  return (
    <div className="error-page">
      <p className="error">{errorMessage}</p>
    </div>
  );
}

export default ErrorPage;