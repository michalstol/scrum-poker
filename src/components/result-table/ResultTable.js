import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// PropTypes to checking variables type
import PropTypes from 'prop-types';

const Row = props => {
    const {name, points} = props;

    return (
        <li>{name} : {points || points === 0 ? points : 'X'}</li>
    );
};

class ResultTable extends PureComponent {
    render() {
        const list = [];
        const {results} = this.props;

        if (Object.keys(results).length > 0) {
            for (let key in results) {
                const el = results[key];

                if (el.role === 'player') {
                    list.push(<Row name={el.name} points={el.points} key={`results-id-${Math.floor(Math.random() * Math.random() * 10000)}`} />);
                }
            }
        }

        return list.length ? (
            <ul>
                {list}
            </ul>
        ) : '';
    }
}

ResultTable.propTypes = {
    results: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    results: state.results
});

export default connect(mapStateToProps, { })(ResultTable);