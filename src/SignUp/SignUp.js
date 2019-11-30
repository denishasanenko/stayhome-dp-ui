import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import jwt from "jsonwebtoken";
import "./SignUp.css"
import toastr from "toastr";

const LOGIN_MUTATION = gql`
    mutation signUp($input: SignInput!) {
        signUp(input: $input)
    }
`;

function Main() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    const [loginUser, signData] = useMutation(LOGIN_MUTATION);

    let authorized = true;
    try {
        const token = localStorage.getItem('jwt');
        jwt.verify(token, 'secret')
    } catch (e) {
        authorized = false;
    }

    if (authorized) {
        console.log('Logged in');
        history.push('/boards')
    }

    if (signData.error) {
        toastr.options = {
            positionClass : 'toast-top-full-width',
            hideDuration: 300,
            timeOut: 6000,
            closeButton: true
        };
        toastr.clear();
        setTimeout(() => toastr.error(signData.error.graphQLErrors[0].message), 300);
    }

    if (signData.data) {
        localStorage.setItem('jwt', signData.data.signIn);
        console.log(signData.data);
        history.push('/boards')
    }

    const submitForm = event => {
        event.preventDefault();
        console.log(email, password);
        loginUser({ variables: {input: { email, password }}});
    }

    return (
        <div className="Main">
            <div className="form-wrapper">
                <h1>Sign up</h1>
                <form action="#" onSubmit={submitForm}>
                    <label>
                        E-mail:
                        <input type="email" required onChange={event => setEmail(event.target.value)} />
                    </label><br/>
                    <label>
                        Password:
                        <input type="password" required onChange={event => setPassword(event.target.value)} />
                    </label><br/>
                    <label>
                        <button>Sign up</button>
                    </label>
                    <label>
                        <Link to="/">Sign in</Link>
                    </label>
                </form>
            </div>
        </div>
    );

}

export default Main;
