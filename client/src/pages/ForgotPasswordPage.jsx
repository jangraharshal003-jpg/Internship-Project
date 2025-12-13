import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function ForgotPasswordPage() {
  const { forgotPassword } = useUser();
  const [email, setEmail] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
  };

  return (
    <div className="auth-page card">
      <h2 className="title">Reset your access</h2>
      <p className="muted">Enter your email to receive a reset link.</p>
      <form className="form" onSubmit={submit}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button className="btn primary" type="submit">
          Send reset link
        </button>
      </form>
      <div className="muted" style={{ marginTop: 8 }}>
        Remembered? <Link to="/login">Back to login</Link>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;

