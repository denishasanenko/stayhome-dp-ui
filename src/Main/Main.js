import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import jwt from "jsonwebtoken";
import "./main.css"

const LOGIN_MUTATION = gql`
    mutation signIn($input: SignInput!) {
        signIn(input: $input)
    }
`;

function Main() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let history = useHistory();

    const [loginUser, { data, error }] = useMutation(LOGIN_MUTATION);

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

    if (error) {
        console.log(error);
    }

    if (data) {
        localStorage.setItem('jwt', data.signIn);
        console.log(data);
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
                    <img src="/logo.png" className="App-logo" alt="logo" />
                    <h1>Vedrospective</h1>
                    <form onSubmit={submitForm}>
                        <div>
                            <label>
                                E-mail:
                                <input type="email" required onChange={event => setEmail(event.target.value)} />
                            </label><br/>
                            <label>
                                Password:
                                <input type="password" required onChange={event => setPassword(event.target.value)} />
                            </label><br/>
                            <label>
                                <button>Log in</button>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
    );

}

export default Main;
