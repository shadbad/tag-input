/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

const useOutsideClickDetector = function (surfaceSelectors: string, handler: () => void, dependencies = []) {
    useEffect(() => {
        const bodyClickHandler = (e: any) => {
            const surfaces = Array.from(document.querySelectorAll(surfaceSelectors));

            let isOutside = true;

            if (!surfaces || surfaces.length === 0) return;

            surfaces.forEach((surface) => {
                if (surface.contains(e.target)) isOutside = false;
            });

            if (isOutside) handler();
        };

        document.body.addEventListener('click', bodyClickHandler);

        return () => document.body.removeEventListener('click', bodyClickHandler);
    }, dependencies);
};

export { useOutsideClickDetector };
