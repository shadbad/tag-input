import './textbox.scss';

function Textbox({ className, label, value, onChange, onKeyUp, onBlur, onFocus }: PropTypes) {
    return (
        <input
            type="text"
            className={`${className} textbox`}
            placeholder={label}
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}
            onBlur={onBlur}
            onFocus={onFocus}
        />
    );
}

type PropTypes = {
    className?: string;
    label: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
    onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
    onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
};

Textbox.defaultProps = {
    className: '',
    value: '',
    onChange: undefined,
    onKeyUp: undefined,
    onBlur: undefined,
    onFocus: undefined
};

export { Textbox };
