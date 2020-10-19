import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// PropTypes to checking variables type
import PropTypes from 'prop-types';

// import components
import ResultTable from './../result-table/ResultTable';
import ResetTable from './../reset-table/ResetTable';

class CroupierPanel extends PureComponent {
    render() {
        return (
            <div>
                <ResultTable />
                <ResetTable />
            </div>
        );
    }
}

CroupierPanel.propTypes = {
    role: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    role: state.role
});

export default connect(mapStateToProps, {})(CroupierPanel);