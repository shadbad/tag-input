import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Chip } from './chip';

describe('<Chip/>', () => {
    it('renders a chip button', () => {
        render(<Chip title="sample" />);
        const chipButton = screen.getByRole('button', { name: 'sample' });
        expect(chipButton).toBeInTheDocument();
    });

    it('binds passed click event handler', async () => {
        user.setup();
        const onClick = jest.fn();
        render(<Chip title="sample" onClick={onClick} />);
        await user.click(screen.getByRole('button', { name: 'sample' }));
        expect(onClick).toBeCalledTimes(1);
    });
});
