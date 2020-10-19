import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// PropTypes to checking variables type
import PropTypes from 'prop-types';

// import action
import { fetchUser, signOut } from './../../actions/auth-actions';

class Auth extends PureComponent {
    constructor(props) {
        super(props);
        
        if (this.props.auth && !this.props.auth.uid) {
            this.props.fetchUser();
        }
    }

    render() {
        return (
            <div>
                is loggin: {this.props.auth && this.props.auth.uid ? 'yes!' : 'nope!'}
            </div>
        );
    }
}

Auth.propTypes = {
    fetchUser: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { fetchUser, signOut })(Auth);