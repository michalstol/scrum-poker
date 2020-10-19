import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// PropTypes to checking variables type
import PropTypes from 'prop-types';

// import components
import ResultTable from './../result-table/ResultTable';

class SpectatorPanel extends PureComponent {

    render() {
        return (
            <ResultTable />
        );
    }
}

SpectatorPanel.propTypes = {
    role: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    role: state.role
});

export default connect(mapStateToProps, {})(SpectatorPanel);