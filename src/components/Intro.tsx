import React from 'react';
import { Frame } from 'framer';

export default function Intro(): any {
    return (
        <Frame
            center
            size={100}
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
                    duration: 2,
                    repeat: Infinity,
                },
            }}
        />
    );
}
