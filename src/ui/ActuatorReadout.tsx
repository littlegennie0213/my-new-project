import type { PlatformGeometry } from '../types/platform';

interface ActuatorReadoutProps {
  lengths: number[];
  geometry: PlatformGeometry;
}

export function ActuatorReadout({ lengths, geometry }: ActuatorReadoutProps) {
  return (
    <section className="panel actuator-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Actuators</p>
          <h2>Live lengths</h2>
        </div>
        <p className="supporting-text">
          Safe stroke: {geometry.actuatorMinLength}–{geometry.actuatorMaxLength} mm
        </p>
      </div>

      <ul className="actuator-list">
        {lengths.map((length, index) => {
          const outOfRange = length < geometry.actuatorMinLength || length > geometry.actuatorMaxLength;

          return (
            <li className={`actuator-item ${outOfRange ? 'is-danger' : ''}`} key={`actuator-${index + 1}`}>
              <span>Leg {index + 1}</span>
              <strong>{length.toFixed(1)} mm</strong>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
