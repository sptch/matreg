import { render } from '@testing-library/react';

import InfoCard from './info-card';

describe('InfoCard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InfoCard />);
    expect(baseElement).toBeTruthy();
  });
});
