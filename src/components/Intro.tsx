import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import styles from './../styles/intro.module.scss';

export default function Intro({ connected }: any): any {
    const { intro, ['intro-loader']: instroLoader } = styles;
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        setFinished(true);
    }, [connected]);

    return (
        <div className={intro} is-finished={connected ? 1 : 0}>
            <motion.div
                layout
                className={instroLoader}
                // initial={{
                //     translateX: '-50%',
                //     translateY: '-50%',
                //     translateZ: 0,
                //     scale: 0.2,
                // }}
                // animate={{
                //     rotate: [0, 180, 180, 360, 360],
                //     scale: [0.2, 0.2, 0.3, 0.3, 0.2],
                //     borderRadius: ['10%', '50%', '50%', '10%', '10%'],
                // }}
                // transition={{
                //     duration: 2,
                //     ease: 'easeInOut',
                //     loop: connected ? 1 : Infinity,
                //     repeatDelay: 0,
                // }}
                transition={{
                    type: 'spring',
                    stiffness: 700,
                    damping: 30,
                }}
            />
        </div>
    );
}
