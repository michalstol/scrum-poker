import React from 'react';
import { Frame, AnimatePresence } from 'framer';

import useWindowSize from './../hooks/useWindowSize';

interface PageWrapperInterface {
    render: boolean;
    children: any;
    opacity?: number | number[];
    zIndex?: number;
    delay?: number;
}

export default function PageWrapper({
    render,
    children,
    zIndex = 1,
    opacity = [0, 1],
    delay = 0,
}: PageWrapperInterface) {
    const windowSize = useWindowSize();

    return (
        <AnimatePresence>
            {render && (
                <Frame
                    top={0}
                    left={0}
                    width={windowSize.width}
                    height={windowSize.height}
                    backgroundColor="var(--color-bg)"
                    style={{ zIndex }}
                    animate={{
                        opacity,
                        transition: {
                            duration: 0.5,
                            repeat: 0,
                        },
                    }}
                    exit={{
                        opacity: [1, 0],
                        transition: {
                            duration: 0.5,
                            repeat: 0,
                            delay,
                        },
                    }}
                >
                    {children}
                </Frame>
            )}
        </AnimatePresence>
    );
}
