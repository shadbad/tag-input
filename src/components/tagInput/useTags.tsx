import { useState } from 'react';

function useTags() {
    const [tags, setTags] = useState<Tag[]>([]);

    const exists = (label: string) =>
        tags.findIndex((item) => item.label.toLowerCase() === label.trim().toLowerCase()) > -1;

    const extract = (input: string) =>
        input
            .split(',')
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

    const add = (input: string) => {
        const tagsArray = extract(input);

        const result = [...tags];

        tagsArray.forEach((item) => {
            if (!exists(item)) {
                result.push({
                    id: item.toLowerCase().replace(' ', '-'),
                    label: item
                });
            }
        });

        setTags(result);
    };

    const remove = (id: string) => {
        const result = [...tags];
        const index = tags.findIndex((item) => item.id === id);
        result.splice(index, 1);
        setTags(result);
    };

    return {
        list: tags,
        add,
        remove
    };
}

export type Tag = {
    id: string;
    label: string;
};

export default useTags;
