import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// PropTypes to checking variables type
import PropTypes from 'prop-types';

// import action
import { dbSession } from './../../actions/results-actions';

class ResetTable extends PureComponent {
    constructor() {
        super();

        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        const resetResults = {};
        const { results } = this.props;

        for (let key in results) {
            resetResults[key] = {...results[key], points: false};
        }

        dbSession.set(resetResults);
    }

    render() {
        return (
            <div onClick={this.clickHandler}>Reset</div>
        );
    }
}

ResetTable.propTypes = {
    results: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    results: state.results
});

export default connect(mapStateToProps, { })(ResetTable);