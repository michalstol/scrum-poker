import React from 'react';
import { formatNumber } from '../../helpers/scrum';

interface BetNumberInterface {
    bet: number;
}

export default function BetNumber({ bet }: BetNumberInterface) {
    return (
        <div className="bet-number">
            <div className="bet-number__el">{formatNumber(bet)}</div>
        </div>
    );
}
