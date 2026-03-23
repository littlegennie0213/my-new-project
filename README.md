# Stewart Platform Simulator

Browser-based 3D Stewart platform simulator built around **inverse kinematics first**. It renders the base plate, top plate, and six actuators in real time, lets you command `x`, `y`, `z`, `roll`, `pitch`, and `yaw`, and shows the resulting actuator lengths immediately.

## Why this structure

The project is split so that future dynamics work does not require a rewrite:

- `src/ik/*` contains pure inverse-kinematics logic.
- `src/validation/*` checks user input and reachability.
- `src/scene/*` handles Three.js rendering only.
- `src/state/*` wires pose input, IK results, and UI.
- `src/integration/physics/*` defines the seam for a future physics backend.

Today the app uses a `NoPhysicsAdapter`, so pose commands are applied directly to the IK solver. Later you can replace that adapter with a physics engine that integrates motion over time.

## Stack

- **Vite** for fast local dev and build output
- **React + TypeScript** for structured UI and strict data flow
- **Three.js via react-three-fiber** for the 3D viewport
- **Zustand-ready state architecture** via a central simulator store
- **Vitest + Testing Library** for unit/UI checks

## Run locally

```bash
npm install
npm run dev
```

Open the local URL from Vite, usually `http://localhost:5173`.

### Allow other devices on your network to open it

The dev server is configured with `--host 0.0.0.0`, so devices on the same network can open it using your machine's LAN IP:

```bash
http://YOUR_LOCAL_IP:5173
```

Example:

```bash
http://192.168.0.15:5173
```

This is useful for quick testing, but it is not a public internet deployment.

## Publish as a real website

This project now includes a GitHub Pages deployment workflow at `.github/workflows/deploy.yml`.

### GitHub Pages deployment

1. Push this repository to GitHub.
2. Make sure the default branch is `main`.
3. In GitHub, open `Settings -> Pages`.
4. Set the source to `GitHub Actions`.
5. Push to `main` or manually run the workflow from the `Actions` tab.

After deployment, the site will be available at:

```text
https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/
```

The app is built as a static site, so visitors can open that URL directly without running anything locally.

### Verification commands

```bash
npm run test
npm run typecheck
npm run build
```

Manual verification for this version also included loading the app in a browser, checking that the 3D viewport renders the base/top/6 actuators, and confirming that pose controls and actuator readouts respond live.

## How the math works

We use the standard Stewart-platform inverse-kinematics flow for **linear actuators**.

### 1. Define two anchor sets

- `B_i`: base anchor positions in the fixed base frame
- `P_i`: top-plate anchor positions in the top plate's local frame

There are six of each, and anchor `i` on the base connects to anchor `i` on the top plate.

### 2. Build the commanded pose

The user provides:

- translation: `(x, y, z)`
- orientation: `(roll, pitch, yaw)` in degrees

The app converts roll/pitch/yaw into a rotation matrix using a Z-Y-X style composition and applies that rotation to each local top-plate anchor.

For rendering, the physical Stewart-platform frame is mapped into Three.js as:

```text
physical (x, y, z) -> three.js (x, z, y)
```

That keeps the simulator's physical `z` axis vertical while still using Three.js' default `y`-up world.

### 3. Transform each top anchor into world coordinates

For each leg `i`:

```text
Q_i = T + R * P_i
```

Where:

- `T` is the translation vector
- `R` is the rotation matrix
- `Q_i` is the world-space position of the top anchor

### 4. Compute actuator vectors and lengths

```text
L_i_vec = Q_i - B_i
L_i = ||L_i_vec||
```

That Euclidean norm gives the commanded actuator length.

## Validation and limits

The simulator checks two things:

1. **Pose limits** for `x`, `y`, `z`, `roll`, `pitch`, and `yaw`
2. **Actuator stroke limits** for all six legs

If either fails, the UI shows a warning banner and marks the pose as constrained.

## Architecture overview

```text
Pose controls -> simulator store -> IK solver -> validation -> 3D scene + actuator readout
                                    |
                                    +-> future PhysicsAdapter implementation
```

### Important files

- `src/config/defaultPlatform.ts`: geometry, neutral pose, and input limits
- `src/ik/stewartIK.ts`: inverse kinematics
- `src/validation/poseValidation.ts`: limits and reachability checks
- `src/scene/SceneCanvas.tsx`: 3D viewport
- `src/scene/PlatformScene.tsx`: base/top plates and six actuators
- `src/integration/physics/PhysicsAdapter.ts`: expansion seam for future dynamics

## Future extension to a physics engine

To move beyond direct IK:

1. implement a new `PhysicsAdapter`
2. integrate actuator velocity/acceleration constraints
3. replace direct pose application with a time-stepped backend
4. feed the resulting physical pose back into the same render pipeline

Because the renderer consumes solved geometry rather than computing physics itself, that swap can stay localized to the adapter/state boundary.

## Current scope

- 3D visualization of base, top plate, and six legs
- pose control with sliders and numeric inputs
- real-time actuator lengths
- validation for both pose ranges and actuator stroke
- browser-first architecture prepared for future dynamics work
