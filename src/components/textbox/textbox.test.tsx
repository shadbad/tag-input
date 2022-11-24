import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Textbox } from './textbox';

describe('<Textbox />', () => {
    it('renders correctly', () => {
        const onChange = jest.fn();
        render(<Textbox label="sample" onChange={onChange} value="" />);
        expect(screen.getByPlaceholderText('sample')).toBeInTheDocument();
    });

    it('binds change event handler', async () => {
        user.setup();
        const onChange = jest.fn();
        render(<Textbox label="sample" onChange={onChange} value="" />);
        await user.type(screen.getByPlaceholderText('sample'), 'test');
        expect(onChange).toBeCalledTimes(4);
    });
});
