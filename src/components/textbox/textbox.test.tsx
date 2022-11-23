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
        const onInput = jest.fn();
        render(<Textbox label="sample" onInput={onInput} />);
        await user.type(screen.getByPlaceholderText('sample'), 'test');
        expect(onInput).toBeCalledTimes(4);
    });
});
