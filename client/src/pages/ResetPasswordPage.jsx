import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function ResetPasswordPage() {
  const { token } = useParams();
  const { resetPassword } = useUser();
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await resetPassword(token, password);
  };

  return (
    <div className="auth-page card">
      <h2 className="title">Choose a new password</h2>
      <p className="muted">Keep it strong and unique.</p>
      <form className="form" onSubmit={submit}>
        <div>
          <label>New password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>
        <button className="btn primary" type="submit">
          Reset password
        </button>
      </form>
      <div className="muted" style={{ marginTop: 8 }}>
        <Link to="/login">Back to login</Link>
      </div>
    </div>
  );
}

export default ResetPasswordPage;

