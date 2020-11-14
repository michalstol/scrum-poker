import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AlertInterface {
    type: 'error' | 'success';
    content?: string;
    setAlert: React.Dispatch<React.SetStateAction<string>>;
}

const alertTypes = {
    error: {
        timeout: 3000,
    },
    success: {
        timeout: 2000,
    },
};

export default function Alert({ type, content, setAlert }: AlertInterface) {
    const [visible, setVisible] = useState(!!content);
    const [alertContent, setAlertContent] = useState(content || '');

    useEffect(() => {
        if (!!content && content !== '' && !visible) {
            setAlertContent(content);
            setVisible(true);
        }
    }, [content]);

    useEffect(() => {
        if (visible && alertContent !== '') {
            const { timeout } = alertTypes[type];

            setTimeout(() => {
                setVisible(false);
                setAlert('');
            }, timeout);
        }
    }, [visible]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="alert"
                    data-type={type}
                    initial={{
                        translateY: -50,
                    }}
                    animate={{
                        translateY: 0,
                    }}
                    transition={{
                        ease: [0, 0, 0, 1],
                        duration: 0.3,
                    }}
                    exit={{
                        translateY: -50,
                        transition: {
                            ease: [0, 0, 1, 0],
                        },
                    }}
                >
                    {alertContent}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
