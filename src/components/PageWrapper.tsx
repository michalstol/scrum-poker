import React from 'react';
import { Frame, AnimatePresence } from 'framer';

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
    return (
        <AnimatePresence>
            {render && (
                <Frame
                    top={0}
                    bottom={0}
                    left={0}
                    right={0}
                    width="100%"
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
