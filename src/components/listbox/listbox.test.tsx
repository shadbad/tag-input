import { screen, render } from '@testing-library/react';
import { Listbox } from './listbox';

describe('<Listbox/>', () => {
    const items = [
        {
            label: 'Sample 1',
            id: 'sample-1'
        },
        {
            label: 'Sample 2',
            id: 'sample-2'
        },
        {
            label: 'Sample 3',
            id: 'sample-3'
        }
    ];

    it('renders the list of items', () => {
        render(<Listbox items={items} currentIndex={0} />);
        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getAllByRole('listitem').map((item) => item.textContent)).toEqual(
            items.map((item) => item.label)
        );
    });

    it('marks the first list item', () => {
        render(<Listbox items={items} currentIndex={0} />);
        expect(screen.getAllByRole('listitem')[0]).toHaveClass('listbox__item--mark');
    });
});
