import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// PropTypes to checking variables type
import PropTypes from 'prop-types';

// import actions
import { vote } from './../../actions/voted-actions';

class Vote extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            points: props.points
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.submit = this.submit.bind(this);
    }

    changeHandler({currentTarget}) {
        this.setState({
            points: parseInt(currentTarget.value)
        });
    }

    submit() {
        this.props.vote(this.props.auth.uid, this.state.points);
    }

    render() {
        return (
            <div>
                <input type="number" onChange={this.changeHandler} value={this.state.points} />
                <div onClick={this.submit}>vote</div>
            </div>
        );
    }
}

Vote.propTypes = {
    vote: PropTypes.func.isRequired,
    voted: PropTypes.bool.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    voted: state.voted,
    auth: state.auth
});

export default connect(mapStateToProps, { vote })(Vote);