import { render, screen } from '@testing-library/react';
import { App } from 'components';

test('renders assignments title', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Tag input' })).toBeInTheDocument();
});
