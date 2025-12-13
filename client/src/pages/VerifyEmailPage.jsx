import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function VerifyEmailPage() {
  const { token } = useParams();
  const { verifyEmail } = useUser();

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  return (
    <div className="auth-page card">
      <h2 className="title">Verifying...</h2>
      <p className="muted">Please wait while we verify your email.</p>
      <div className="muted" style={{ marginTop: 12 }}>
        If this takes too long, <Link to="/login">return to login</Link>.
      </div>
    </div>
  );
}

export default VerifyEmailPage;

