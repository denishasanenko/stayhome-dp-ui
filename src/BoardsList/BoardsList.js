import React from 'react';
import {Query} from "@apollo/react-components";
import {gql} from "apollo-boost";
import { Link } from 'react-router-dom';
import './boards-list.css';

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
                <p>
                    Boards list page
                </p>
                <Query query={GET_CHARACTERS}>
                    {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;

                        return (
                            <div className="boards">
                                {data.allBoards.map(board => (
                                    <Link to={`/boards/${board.id}`}>
                                        <div className="board">
                                            <p>{board.name}</p>
                                            <p>{board.posted_by.email}</p>
                                        </div>
                                    </Link>
                                ))}
                                <div className="board board-add">
                                    <p>Add new one</p>
                                </div>
                            </div>
                        );
                    }}
                </Query>
        </div>
    );
}

export default BoardsList;
