import React, {useState} from 'react';
import {useMutation, useQuery} from "react-apollo";
import { gql } from "apollo-boost";
import "./main.css"
import toastr from "toastr";

const ADD_PROFILE = gql`
    mutation postProfile($input: PostProfile!) {
        postProfile(input: $input) {
            id
        }
    }
`;
const REMOVE_PROFILE = gql`
    mutation removeProfile($id: String!) {
        removeProfile(id: $id) {
            boolean
        }
    }
`;

const GET_PROFILES = gql`
    query profiles {
        profiles {
            id
            name
            facebook_link
            specialty
        }
    }
`;

function Main() {

    let { loading, error, data, refetch } = useQuery(GET_PROFILES);
    const [inProcess, setInProcess] = useState(false);

    const [name, setName] = useState('');
    const [facebookLink, setFacebookLink] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [about, setAbout] = useState('');

    const [addProfile, profileData] = useMutation(ADD_PROFILE);

    if (profileData.error) {
        const errorMessage = profileData.error.graphQLErrors[0].message;
        profileData.error = null;
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

    if (profileData.data) {
        setTimeout(() => {refetch();}, 300);
        // history.push('/boards')
        setTimeout(() => {
            setName('');
            setFacebookLink('');
            setSpecialty('');
            setAbout('');
            setInProcess(false);
        }, 300)
        // localStorage.setItem('jwt', signData.data.signIn);
    }

    const submitForm = event => {
        event.preventDefault();
        setInProcess(true);
        addProfile({ variables: {input: { name, facebook_link: facebookLink, specialty, about }}});
    }

    if (loading) {
        return "Loading...";
    }
    if (error) {
        return `Error! ${error.message}`;
    }

    return (
            <div className="Main">
                <div className="form-wrapper">
                    <h1>#StayHomeDp</h1>
                    <form action="#" onSubmit={submitForm}>
                        <label>
                            Имя:
                            <input type="text" placeholder="Вася Пупкин" required onChange={event => setName(event.target.value)} />
                        </label><br/>
                        <label>
                            Facebook:
                            <input type="text" placeholder="https://www.facebook.com/some.profile" required onChange={event => setFacebookLink(event.target.value)} />
                        </label><br/>
                        <label>
                            Специализация:
                            <input type="text" placeholder="Преподаватель английского" required onChange={event => setSpecialty(event.target.value)} />
                        </label><br/>
                        <label>
                            Био:
                            <textarea placeholder="Пара слов о человеке и специализации. Место для рекламы" onChange={event => setAbout(event.target.value)}></textarea>
                        </label><br/>
                        <label>
                            <button disabled={inProcess}>Добавить</button>
                        </label>
                    </form>
                </div>
                <br/><br/><br/>
                <table>
                    {data.profiles.map(profile => (
                    <tr>
                        <td>{profile.name}</td>
                        <td>{profile.facebook_link}</td>
                        <td>{profile.specialty}</td>
                    </tr>
                    ))}
                </table>
            </div>
    );

}

export default Main;
