import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function LoginPage() {
  const { login } = useUser();
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    await login(form);
  };

  return (
    <div className="auth-page card">
      <h2 className="title">Welcome back</h2>
      <p className="muted">Access your workspace</p>
      <form className="form" onSubmit={submit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>
        <button className="btn primary" type="submit">
          Login
        </button>
      </form>
      <div className="muted" style={{ marginTop: 12 }}>
        <Link to="/forgot-password">Forgot password?</Link>
      </div>
      <div className="muted" style={{ marginTop: 8 }}>
        No account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default LoginPage;

