import React from 'react';

function StatCard({ label, value, accent, children }) {
  return (
    <div className="stat" style={{ borderColor: accent }}>
      <h4>{label}</h4>
      <div className="value">{value}</div>
      {children}
    </div>
  );
}

function StatsBar({ total, active, completed, overdue }) {
  const completion = total ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="stats-grid">
      <StatCard label="Total Tasks" value={total} accent="rgba(255,255,255,0.12)" />
      <StatCard label="Active" value={active} accent="rgba(59,130,246,0.3)" />
      <StatCard label="Completed" value={completed} accent="rgba(52,211,153,0.3)">
        <div className="progress-bar" style={{ marginTop: 8 }}>
          <div className="progress-inner" style={{ width: `${completion}%` }} />
        </div>
        <span className="muted" style={{ fontSize: 12 }}>{completion}% done</span>
      </StatCard>
      <StatCard label="Overdue" value={overdue} accent="rgba(248,113,113,0.3)" />
    </div>
  );
}

export default StatsBar;

