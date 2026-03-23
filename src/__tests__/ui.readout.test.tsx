import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { defaultGeometry } from '../config/defaultPlatform';
import { ActuatorReadout } from '../ui/ActuatorReadout';

describe('ActuatorReadout', () => {
  it('renders all six actuator lengths', () => {
    render(<ActuatorReadout geometry={defaultGeometry} lengths={[150, 151, 152, 153, 154, 155]} />);

    expect(screen.getByText('Leg 1')).toBeInTheDocument();
    expect(screen.getByText('155.0 mm')).toBeInTheDocument();
  });
});
