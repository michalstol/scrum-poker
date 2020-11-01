import React, { useEffect, useState } from 'react';
import { Frame, AnimatePresence } from 'framer';

export default function Intro({ connected }: any): any {
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        setTimeout(() => setFinished(true), 500);
    }, [connected]);

    return (
        <AnimatePresence>
            {!finished && (
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
                    exit={{
                        scale: [1, 1.2, 0],
                        transition: {
                            duration: 1,
                            ease: 'backIn',
                        },
                    }}
                />
            )}
        </AnimatePresence>
    );
}
