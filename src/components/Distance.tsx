import React, { CSSProperties } from 'react';

interface DistanceInterface {
    classes?: string;
    style?: CSSProperties;
    content?: string;
}

export default function Dinstance({
    classes = '',
    style,
    content,
}: DistanceInterface) {
    return (
        <div className={`distance ${classes}`} style={style}>
            {content && <div className="distance-content">{content}</div>}
        </div>
    );
}
