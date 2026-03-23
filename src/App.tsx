import { SceneCanvas } from './scene/SceneCanvas';
import { useSimulatorStore } from './state/simulatorStore';
import { ActuatorReadout } from './ui/ActuatorReadout';
import { PoseControls } from './ui/PoseControls';
import { ValidationBanner } from './ui/ValidationBanner';

function App() {
  const { geometry, pose, result, issues, setPoseValue, resetPose, adapterName } = useSimulatorStore();

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Stewart platform simulator</p>
          <h1>Inverse-kinematics sandbox for a six-actuator motion platform.</h1>
          <p className="hero-copy">
            This first version runs entirely in the browser, computes actuator lengths from pose targets in real time, and keeps the
            math, state, and rendering layers separate so a future dynamics backend can slot in cleanly.
          </p>
        </div>

        <div className="hero-metrics">
          <div>
            <span>Simulation mode</span>
            <strong>{adapterName}</strong>
          </div>
          <div>
            <span>Current reachability</span>
            <strong>{result.isReachable ? 'reachable' : 'constrained'}</strong>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="left-column">
          <ValidationBanner issues={issues} />
          <PoseControls onChange={setPoseValue} onReset={resetPose} pose={pose} />
          <ActuatorReadout geometry={geometry} lengths={result.actuatorLengths} />
        </div>

        <section className="panel scene-panel">
          <div className="panel-header scene-header">
            <div>
              <p className="eyebrow">3D viewport</p>
              <h2>Base, top plate, and all six legs</h2>
            </div>
            <p className="supporting-text">Drag to orbit. Scroll to zoom. Blue plate is the commanded top platform.</p>
          </div>

          <SceneCanvas geometry={geometry} pose={pose} topAnchorsWorld={result.topAnchorsWorld} />
        </section>
      </section>
    </main>
  );
}

export default App;
