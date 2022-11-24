import './listbox.scss';

function Listbox({ className, expand, items, onClick }: PropTypes) {
    return (
        <ul className={`${className} ${expand ? 'listbox--expanded' : ''} listbox`}>
            {items.map((item) => (
                <li className={`listbox__item ${item.isSelected ? 'listbox__item--mark' : ''}`} key={item.id}>
                    <button
                        className="listbox__item__button"
                        type="button"
                        onClick={() => onClick && onClick(item.label)}
                    >
                        {item.label}
                    </button>
                </li>
            ))}
        </ul>
    );
}

type PropTypes = {
    className?: string;
    expand?: boolean;
    items: { label: string; id: string; isSelected: boolean }[];
    onClick?: (label: string) => void | undefined;
};

Listbox.defaultProps = {
    className: '',
    expand: true,
    onClick: undefined
};

export { Listbox };
