import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";
import jwt from "jsonwebtoken";

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
                    <form onSubmit={submitForm}>
                        <div>
                            <label>
                                <input type="text" onChange={event => setEmail(event.target.value)} />
                                E-mail
                            </label>
                            <label>
                                <input type="password" onChange={event => setPassword(event.target.value)} />
                                Password
                            </label>
                            <label>
                                <button>Log in</button>
                            </label>
                        </div>
                    </form>
                    <p>
                        Main page
                    </p>
                    <Link to="/board">Go to board</Link>
            </div>
    );

}

export default Main;
