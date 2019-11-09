import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {Query} from "@apollo/react-components";
import {gql} from "apollo-boost";

function Board() {

    const GET_CHARACTERS = gql`
        query getBoard($id: String!) {
            getBoard(id: $id) {
                id
                name
                description
                columns {
                    title
                    color
                }
                posted_by {
                    email
                }
            }
        }
    `;

    let { id } = useParams();

    console.log(id);

    return (
        <div className="Board">
            <header className="Board-header">
                <Link to="/list">Back boards list</Link>
                <Query query={GET_CHARACTERS} variables={{id: id}}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;

                        return (
                            <div className="characters">
                                <p>
                                    Board page {data.getBoard.name}
                                </p>
                            </div>
                        );
                    }}
                </Query>
            </header>
        </div>
    );
}

export default Board;
