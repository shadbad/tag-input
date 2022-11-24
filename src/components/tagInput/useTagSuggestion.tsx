import { useState } from 'react';

function useTagSuggestion() {
    const [suggestions, setSuggestions] = useState<TagSuggestion[]>([]);

    const getCurrentMarkedIndex = () => suggestions.findIndex((t) => t.isSelected);

    const mark = (index: number) => {
        setSuggestions(
            suggestions.map((s, i) => ({
                label: s.label,
                id: s.id,
                isSelected: i === index
            }))
        );
    };

    const markNext = () => {
        const currentIndex = getCurrentMarkedIndex();
        mark(currentIndex + 1 === suggestions.length ? 0 : currentIndex + 1);
    };

    const markPrev = () => {
        const currentIndex = getCurrentMarkedIndex();
        mark(currentIndex - 1 < 0 ? suggestions.length - 1 : currentIndex - 1);
    };

    const filter = (keyword: string) => {
        const data = [
            {
                id: 'apple',
                label: 'Apple'
            },
            {
                id: 'apple2',
                label: 'Apple 2'
            },
            {
                id: 'apple3',
                label: 'Apple 3'
            },
            {
                id: 'apple4',
                label: 'Apple 4'
            },
            {
                id: 'gillette',
                label: 'Gillette'
            },
            {
                id: 'mastercard',
                label: 'Mastercard'
            },
            {
                id: 'the-walt-disney-company',
                label: 'The Walt Disney Company'
            },
            {
                id: 'facebook',
                label: 'Facebook'
            },
            {
                id: 'louis-vuitton',
                label: 'Louis Vuitton'
            }
        ];

        setSuggestions(
            data
                .filter((item) => item.label.toLowerCase().startsWith(keyword.toLowerCase()))
                .map((item, index) => ({ id: item.id, label: item.label, isSelected: index === 0 }))
        );
    };

    const getMarkedLabel = () => suggestions.find((item) => item.isSelected)?.label ?? '';

    const clear = () => setSuggestions([]);

    return {
        list: suggestions,
        markNext,
        markPrev,
        filter,
        getMarkedLabel,
        clear
    };
}

export type TagSuggestion = {
    id: string;
    label: string;
    isSelected: boolean;
};

export default useTagSuggestion;
