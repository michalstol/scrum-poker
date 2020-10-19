import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// PropTypes to checking variables type
import PropTypes from 'prop-types';

// import action
import { setRole } from './../../actions/role-actions';

const roles = [
    'player',
    'croupier',
    'spectator'
];

class SelectRole extends PureComponent {
    constructor() {
        super();

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler({currentTarget}) {
        this.props.setRole(currentTarget.dataset.value);
    }

    render() {
        const items = [];

        for (let item of roles) {
            items.push(<li key={`role-id--${item}`} data-value={item} onClick={this.clickHandler}>{item}</li>);
        }

        return (
            <div>
                role: {this.props.role}

                <ul>
                    {items}
                </ul>
            </div>
        );
    }
}

SelectRole.propTypes = {
    setRole: PropTypes.func.isRequired,
    role: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    role: state.role
});

export default connect(mapStateToProps, { setRole })(SelectRole);