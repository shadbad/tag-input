import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Textbox } from './textbox';

describe('<Textbox />', () => {
    it('renders correctly', () => {
        render(<Textbox label="sample" />);
        expect(screen.getByPlaceholderText('sample')).toBeInTheDocument();
    });

    it('binds change event handler', async () => {
        user.setup();
        const onChange = jest.fn();
        render(<Textbox label="sample" onChange={onChange} />);
        await user.type(screen.getByPlaceholderText('sample'), 'test');
        expect(onChange).toBeCalledTimes(4);
    });
});
