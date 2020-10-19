import React from 'react';

const Field = props => {
    const {name = '', type = 'text', event = () => {}, data = ''} = props;

    return (
        <input type={type} onChange={event} value={data} placeholder={name} />
    );
};

export default Field;