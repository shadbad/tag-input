import React from 'react';
import './chip.scss';

function ChipComponent({ className, title, onClick }: propTypes) {
    return (
        <button type="button" className={`${className} chip`} onClick={onClick}>
            {title}
        </button>
    );
}

type propTypes = {
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
