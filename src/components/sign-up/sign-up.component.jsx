import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.action';

import './sign-up.styles.scss';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const {displayName, email, password, confirmPassword} = userCredentials;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("password don't match");
            return;
        }

        signUpStart({displayName, email, password});
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setUserCredentials({...userCredentials, [name]: value});
    };

    return <div className='sign-up'>
        <h2 className='title'>I do not have an account</h2>
        <span>Sign up with email and password</span>
        <form className='sign-up-form' onSubmit={handleSubmit}>
            <FormInput
                type='text'
                name='displayName'
                value={displayName}
                label='Display Name'
                onChange={handleChange}
            />
            <FormInput
                type='email'
                name='email'
                value={email}
                label='Email'
                onChange={handleChange}
            />
            <FormInput
                type='password'
                name='password'
                value={password}
                label='Password'
                onChange={handleChange}
            />
            <FormInput
                type='password'
                name='confirmPassword'
                value={confirmPassword}
                label='Confirm Password'
                onChange={handleChange}
            />
            <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
    </div>
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
})

export default connect(null, mapDispatchToProps)(SignUp);

