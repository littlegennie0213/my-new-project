import { poseLimits } from '../config/defaultPlatform';
import type { PlatformPose } from '../types/pose';

interface PoseControlsProps {
  pose: PlatformPose;
  onChange: (key: keyof PlatformPose, value: number, clamp?: boolean) => void;
  onReset: () => void;
}

export function PoseControls({ pose, onChange, onReset }: PoseControlsProps) {
  return (
    <section className="panel controls-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Pose controller</p>
          <h2>Top plate target</h2>
        </div>
        <button className="ghost-button" onClick={onReset} type="button">
          Reset pose
        </button>
      </div>

      <div className="control-list">
        {(Object.keys(poseLimits) as Array<keyof PlatformPose>).map((key) => {
          const limit = poseLimits[key];

          return (
            <label key={key} className="control-row">
              <div className="control-meta">
                <span>{limit.label}</span>
                <span>
                  {limit.min} to {limit.max} {limit.unit}
                </span>
              </div>

              <input
                aria-label={limit.label}
                className="control-slider"
                max={limit.max}
                min={limit.min}
                onChange={(event) => onChange(key, Number(event.target.value), true)}
                step={limit.step}
                type="range"
                value={pose[key]}
              />

              <div className="number-input-wrap">
                <input
                  aria-label={`${limit.label} numeric input`}
                  className="number-input"
                  onBlur={(event) => onChange(key, Number(event.target.value), true)}
                  onChange={(event) => onChange(key, Number(event.target.value), false)}
                  step={limit.step}
                  type="number"
                  value={Number.isFinite(pose[key]) ? pose[key] : ''}
                />
                <span>{limit.unit}</span>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
