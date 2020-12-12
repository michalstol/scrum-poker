import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer';

import { scrumPoints } from '../../helpers/scrum';

interface CardsInterface {
    setBet: React.Dispatch<React.SetStateAction<number>>;
    setVoted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Cards({ setBet, setVoted }: CardsInterface) {
    const constraintsRef = useRef(null);
    const [selected, setSelected] = useState(0);
    const clickHandler = (cardNumber: number) => {
        if (selected === cardNumber) {
            setVoted(true);
        } else {
            setSelected(cardNumber);
        }
    };

    useEffect(() => {
        setBet(selected);
    }, [selected]);

    return (
        <motion.div className="cards" ref={constraintsRef}>
            <motion.ul
                className="cards__list"
                drag={'x'}
                dragConstraints={constraintsRef}
            >
                {scrumPoints.map(point => (
                    <motion.li
                        key={`card-key-${point}`}
                        className={`cards__el ${
                            point === selected ? 'cards__el--selected' : ''
                        }`.trim()}
                        onTap={() => clickHandler(point)}
                    >
                        <div className="cards__content">
                            <div className="cards-number">
                                {point === 0.5 ? '½' : point}
                            </div>
                            <div className="cards-button">
                                V<br />O<br />T<br />E
                            </div>
                        </div>
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    );
}
