import React from 'react';

interface CardInterface {
    points: number;
}

export default function Card({ points }: CardInterface) {
    return (
        <div className="card">
            <div className="card__number">
                {points !== 0.5 ? points : '1/2'}
            </div>
        </div>
    );
}
