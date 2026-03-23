import type { ValidationIssue } from '../types/platform';

interface ValidationBannerProps {
  issues: ValidationIssue[];
}

export function ValidationBanner({ issues }: ValidationBannerProps) {
  if (issues.length === 0) {
    return (
      <section className="panel status-banner success">
        <p className="eyebrow">Workspace status</p>
        <h2>Pose is reachable</h2>
        <p>All six actuators stay inside their configured travel limits.</p>
      </section>
    );
  }

  return (
    <section className="panel status-banner warning">
      <p className="eyebrow">Workspace status</p>
      <h2>Validation needs attention</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.code}>{issue.message}</li>
        ))}
      </ul>
    </section>
  );
}
