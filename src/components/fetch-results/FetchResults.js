import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// PropTypes to checking variables type
import PropTypes from 'prop-types';

// import action
import { getResults } from './../../actions/results-actions';

class FetchResults extends PureComponent {
    constructor(props) {
        super(props);

        if (Object.keys(props.results).length === 0) {
            props.getResults();
        }
    }

    render() {
        return (
            <div>
                results: { Object.keys(this.props.results).length ? 'downloaded!' : 'fetching!'}
            </div>
        );
    }
}

FetchResults.propTypes = {
    getResults: PropTypes.func.isRequired,
    results: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    results: state.results
});

export default connect(mapStateToProps, { getResults })(FetchResults);