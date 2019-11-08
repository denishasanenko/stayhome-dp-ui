import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { useMutation } from "react-apollo";
import { gql } from "apollo-boost";

const LOGIN_MUTATION = gql`
    mutation signIn($input: SignInput!) {
        signIn(input: $input)
    }
`;

function Main(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loginUser, { data, error, loading }] = useMutation(LOGIN_MUTATION);

    if (localStorage.getItem('jwt')) {
        props.history.push('/list')
    }

    if (error) {
        console.log(error);
    }

    if (data) {
        localStorage.setItem('jwt', data.signIn);
        console.log(data);
        props.history.push('/list')
    }

    const submitForm = event => {
        event.preventDefault();
        console.log(email, password);
        loginUser({ variables: {input: { email, password }}});
    }

    return (
            <div className="Main">
                <header className="Main-header">
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
                </header>
            </div>
    );

}

export default Main;
