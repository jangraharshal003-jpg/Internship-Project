import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function RegisterPage() {
  const { register } = useUser();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    await register(form);
  };

  return (
    <div className="auth-page card">
      <h2 className="title">Create your workspace</h2>
      <p className="muted">Start tracking tasks with Taskfyer.</p>
      <form className="form" onSubmit={submit}>
        <div>
          <label>Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
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
            minLength={6}
            required
          />
        </div>
        <button className="btn primary" type="submit">
          Register
        </button>
      </form>
      <div className="muted" style={{ marginTop: 8 }}>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default RegisterPage;

