import './textbox.scss';

function Textbox({ className, label, onInput }: propTypes) {
    return <input type="text" onInput={onInput} className={`${className} textbox`} placeholder={label} />;
}

type propTypes = {
    className?: string;
    label: string;
    onInput?: React.FormEventHandler<HTMLInputElement> | undefined;
};

Textbox.defaultProps = {
    className: '',
    onInput: undefined
};

export { Textbox };
