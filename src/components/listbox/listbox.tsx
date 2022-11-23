import './listbox.scss';

function Listbox({ className, expand, items, currentIndex }: propTypes) {
    return (
        <ul className={`${className} ${expand ? 'listbox--expand' : ''} listbox`}>
            {items.map((item, index) => (
                <li className={`listbox__item ${index === currentIndex ? 'listbox__item--mark' : ''}`} key={item.id}>
                    {item.label}
                </li>
            ))}
        </ul>
    );
}

type propTypes = {
    className?: string;
    expand?: boolean;
    items: { label: string; id: string }[];
    currentIndex?: number;
};

Listbox.defaultProps = {
    className: '',
    expand: true,
    currentIndex: 0
};

export { Listbox };
