import React from 'react';
import { Frame } from 'framer';

interface IntroInterface {
    duration?: undefined | number;
}

export default function Intro({ duration = 2 }: IntroInterface): any {
    return (
        <Frame
            center
            size={50}
            borderRadius={'20% 20% 20% 110%'}
            background="var(--color-content)"
            animate={{
                borderRadius: [
                    '20% 20% 20% 110%',
                    '20% 20% 110% 20%',
                    '20% 110% 20% 20%',
                    '110% 20% 20% 20%',
                    '20% 20% 20% 110%',
                ],
                transition: {
                    duration,
                    repeat: Infinity,
                },
            }}
        />
    );
}
