import React from 'react';

const Form = props => {
    const {event = () => {}, button = 'Submit', children} = props;

    return children ? (
        <form onSubmit={event}>
            {children}

            <button type="submit">{button}</button>
        </form>
    ) : '';
};

export default Form;