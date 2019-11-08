import React from 'react';
import {Query} from "@apollo/react-components";
import {gql} from "apollo-boost";


const GET_CHARACTERS = gql`
    query listBoards {
        allBoards {
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

function BoardsList() {
    return (
        <div className="BoardsList">
            <header className="BoardsList-header">
                <p>
                    Boards list page
                </p>
                <Query query={GET_CHARACTERS}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;

                        return (
                            <div className="characters">
                                {data.allBoards.map(board => (
                                    <div key={board.name} className="board">
                                        <p>{board.name}</p>
                                        <p>{board.posted_by.email}</p>
                                    </div>
                                ))}
                            </div>
                        );
                    }}
                </Query>

            </header>
        </div>
    );
}

export default BoardsList;
