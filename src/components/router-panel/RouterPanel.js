import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// PropTypes to checking variables type
import PropTypes from 'prop-types';

// import components
import SignIn from './../sign-in/SignIn';
import FetchResults from './../fetch-results/FetchResults';
import SelectRole from './../select-role/SelectRole';
import SpectatorPanel from './../role-panels/SpectatorPanel';
import CroupierPanel from './../role-panels/CroupierPanel';
import PlayerPanel from './../role-panels/PlayerPanel';

class RouterPanel extends PureComponent {
    render() {
        const { auth, role, results } = this.props;
        const isLoggedOut = !auth.uid && !auth.loggedIn;
        const resultsFetched = Object.keys(results).length !== 0;

        return isLoggedOut ? (
            <div>
                <SignIn />
            </div>
        ) : auth.uid ? (
            <div>
                <SelectRole />
                <FetchResults />
                
                { role === 'spectator' && resultsFetched && <SpectatorPanel /> }
                { role === 'croupier' && resultsFetched && <CroupierPanel /> }
                { role === 'player' && resultsFetched && <PlayerPanel uid={auth.uid} /> }
            </div>
        ) : '';
    }
}

RouterPanel.propTypes = {
    auth: PropTypes.object.isRequired,
    results: PropTypes.object.isRequired,
    role: PropTypes.string.isRequired,

};

const mapStateToProps = state => ({
    auth: state.auth,
    results: state.results,
    role: state.role
});

export default connect(mapStateToProps, {})(RouterPanel);