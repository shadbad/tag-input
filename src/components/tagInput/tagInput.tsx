import { useState, useEffect } from 'react';
import { Textbox, Listbox, Chip } from 'components';
import { useOutsideClickDetector } from 'hooks';
import useTagSuggestion from './useTagSuggestion';
import useTags from './useTags';
import './tagInput.scss';

function TagInput({ className }: PropTypes) {
    const tags = useTags();
    const suggestions = useTagSuggestion();
    const [suggestionBoxExpanded, setSuggestionBoxExpanded] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useOutsideClickDetector('.tag-input', () => setSuggestionBoxExpanded(false));

    useEffect(() => {
        const input = inputValue
            .split(',')
            .map((i) => i.trim())
            .pop();

        if (input && input.length > 0) {
            suggestions.filter(input);
            setSuggestionBoxExpanded(suggestions.list.length > 0);
        } else {
            suggestions.clear();
            setSuggestionBoxExpanded(false);
        }
    }, [inputValue, suggestions.list.length]);

    const helpers = {
        replaceLastTagInput(label: string) {
            const inputArray = inputValue
                .split(',')
                .map((i) => i.trim())
                .filter((i) => i.length > 0);

            inputArray.pop();
            inputArray.push(label);
            setInputValue(inputArray.join(', '));
        }
    };

    const handle = {
        inputChange({ target }: React.ChangeEvent<HTMLInputElement>) {
            setInputValue(target.value);
        },
        inputKeyUp({ key }: React.KeyboardEvent<HTMLInputElement>) {
            switch (key) {
                case ',':
                    tags.add(inputValue);
                    break;

                case 'ArrowUp':
                    suggestions.markPrev();
                    break;

                case 'ArrowDown':
                    suggestions.markNext();
                    break;

                case 'Escape':
                    setSuggestionBoxExpanded(false);
                    break;

                case 'Enter': {
                    if (suggestions.list.length > 0) {
                        const label = suggestions.getMarkedLabel();
                        tags.add(label);
                        helpers.replaceLastTagInput(label);
                    } else if (suggestions.list.length === 0 && inputValue.length > 0) {
                        tags.add(inputValue);
                    }
                    break;
                }

                default:
                    break;
            }
        },
        inputFocus() {
            if (suggestions.list.length > 0) setSuggestionBoxExpanded(true);
        },
        tagRemove(id: string) {
            tags.remove(id);
        },
        suggestionClick(label: string) {
            tags.add(label);
            helpers.replaceLastTagInput(label);
        }
    };

    return (
        <div className={`${className} tag-input`}>
            <Textbox
                className="tag-input__textbox"
                label="Add tags..."
                value={inputValue}
                onChange={handle.inputChange}
                onKeyUp={handle.inputKeyUp}
                onFocus={handle.inputFocus}
            />

            <Listbox
                className="tag-input__suggestion-box"
                items={suggestions.list}
                expand={suggestionBoxExpanded}
                onClick={handle.suggestionClick}
            />

            <div className="tag-input__tag-list">
                {tags.list.map((t) => (
                    <Chip title={t.label} key={t.id} onClick={() => handle.tagRemove(t.id)} />
                ))}
            </div>
        </div>
    );
}

type PropTypes = {
    className?: string;
};

TagInput.defaultProps = {
    className: ''
};

export { TagInput };
