import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import jwt from "jsonwebtoken";
import "./main.css"
import toastr from "toastr";

const LOGIN_MUTATION = gql`
    mutation signIn($input: SignInput!) {
        signIn(input: $input)
    }
`;

function Main() {
    const [inProcess, setInProcess] = useState(false);
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
        const errorMessage = signData.error.graphQLErrors[0].message;
        signData.error = null;
        toastr.options = {
            positionClass : 'toast-top-full-width',
            hideDuration: 300,
            timeOut: 6000,
            closeButton: true
        };
        toastr.clear();
        setTimeout(() => {
            if (inProcess) {
                setInProcess(false);
            }
            toastr.error(errorMessage);
        }, 300);
    }

    if (signData.data) {
        localStorage.setItem('jwt', signData.data.signIn);
        history.push('/boards')
    }

    const submitForm = event => {
        event.preventDefault();
        setInProcess(true);
        loginUser({ variables: {input: { email, password }}});
    }

    return (
            <div className="Main">
                <div className="form-wrapper">
                    <img src="/logo.png" className="App-logo" alt="logo" />
                    <h1>Vedrospective</h1>
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
                            <button disabled={inProcess}>Sign in</button>
                        </label>
                        <label>
                            <Link to="/sign-up">Sign up</Link>
                        </label>
                    </form>
                </div>
            </div>
    );

}

export default Main;
