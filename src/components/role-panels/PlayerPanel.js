import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// PropTypes to checking variables type
import PropTypes from 'prop-types';

// import components
import ResultTable from './../result-table/ResultTable';
import Vote from './../vote/Vote';

class PlayerPanel extends PureComponent {
    render() {
        const { uid, results } = this.props;
        const currentData = results[uid];

        return (
            <div>
                <ResultTable />
                <Vote points={currentData.points} />
            </div>
        );
    }
}

PlayerPanel.propTypes = {
    voted: PropTypes.bool.isRequired,
    results: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    voted: state.voted,
    results: state.results
});

export default connect(mapStateToProps, { })(PlayerPanel);