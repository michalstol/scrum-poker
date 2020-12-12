import React from 'react';

interface BetNumberInterface {
    bet: number;
}

export default function BetNumber({ bet }: BetNumberInterface) {
    return (
        <div className="bet-number">
            <div className="bet-number__el">{bet === 0.5 ? '½' : bet}</div>
        </div>
    );
}
