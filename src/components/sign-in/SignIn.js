import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// PropTypes to checking variables type
import PropTypes from 'prop-types';

// import action
import { signIn } from './../../actions/auth-actions';

// import components
import Form from './../simple/Form';
import Field from './../simple/Field';

class SignIn extends PureComponent {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

        this.submitHandler = this.submitHandler.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }

    submitHandler(e) {
        e.preventDefault();

        this.props.signIn(this.state);
    }

    changeValue({currentTarget: $target}) {
        const data = {};
        
        data[$target.getAttribute('type')] = $target.value

        this.setState(data);
    }

    render() {
        return (
            <Form event={this.submitHandler}>
                <Field type="email" event={this.changeValue} data={this.state.email} name="email" />
                <Field type="password" event={this.changeValue} data={this.state.password} name="password" />
            </Form>
        );
    }
}

SignIn.propTypes = {
    signIn: PropTypes.func.isRequired,
    auth: PropTypes.object
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { signIn })(SignIn);