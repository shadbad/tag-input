import { screen, render, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import { TagInput } from './tagInput';

describe('<TagInput />', () => {
    beforeEach(() => {
        user.setup();
        render(<TagInput />);
    });

    it('should add new tags when pressing the comma button', async () => {
        const textbox = screen.getByRole('textbox');
        await user.type(textbox, 'sample,');
        const tag = screen.getByRole('button', { name: 'sample' });
        expect(tag).toBeInTheDocument();
    });

    it('should display a list of suggestions when the user types', async () => {
        const textbox = screen.getByRole('textbox');
        await user.type(textbox, 'master');
        const suggestions = screen.getByRole('button', { name: 'Mastercard' });
        expect(suggestions).toBeInTheDocument();
    });

    it('should add the first suggestion when the user presses the enter key', async () => {
        const textbox = screen.getByRole('textbox');
        await user.type(textbox, 'mas{enter}');
        const suggestion = within(screen.getByRole('list')).getByRole('button', { name: 'Mastercard' });
        expect(suggestion).toBeInTheDocument();
    });

    it('change highlighted suggestion when user presses the arrow key up', async () => {
        const textbox = screen.getByRole('textbox');
        await user.type(textbox, 'a{arrowup}');
        const suggestion = within(screen.getByRole('list')).getByRole('button', { name: 'Apple 4' });
        expect(suggestion.closest('li')).toHaveClass('listbox__item--mark');
    });

    it('change highlighted suggestion when user presses the arrow key down', async () => {
        const textbox = screen.getByRole('textbox');
        await user.type(textbox, 'a{arrowdown}');
        const suggestion = within(screen.getByRole('list')).getByRole('button', { name: 'Apple 2' });
        expect(suggestion.closest('li')).toHaveClass('listbox__item--mark');
    });

    it('adds the highlighted suggestion when user presses the enter key', async () => {
        const textbox = screen.getByRole('textbox');
        await user.type(textbox, 'a{arrowdown}{enter}');
        const suggestion = within(screen.getByRole('list')).getByRole('button', { name: 'Apple 2' });
        expect(suggestion).toBeInTheDocument();
    });

    it('adds a new tag by pressing the enter key when there is no suggestions', async () => {
        const textbox = screen.getByRole('textbox');
        await user.type(textbox, 'sample{enter}');
        const suggestion = screen.getByRole('button', { name: 'sample' });
        expect(suggestion).toBeInTheDocument();
    });

    it('adds the highlighted suggestion when user clicks on the suggestion', async () => {
        const textbox = screen.getByRole('textbox');
        await user.type(textbox, 'a');
        const suggestion = within(screen.getByRole('list')).getByRole('button', { name: 'Apple 2' });
        await user.click(suggestion);
        const tagAndSuggestion = screen.getAllByRole('button', { name: 'Apple 2' });
        expect(tagAndSuggestion).toHaveLength(2);
    });
});
