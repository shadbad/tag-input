import React from 'react';
import './chip.scss';

function ChipComponent({ className, title, onClick }: PropTypes) {
    return (
        <button type="button" className={`${className} chip`} onClick={onClick}>
            {title}
        </button>
    );
}

type PropTypes = {
    className?: string;
    title: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

ChipComponent.defaultProps = {
    className: '',
    onClick: undefined
};

const Chip = React.memo(ChipComponent);

export { Chip };
