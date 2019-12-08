import React from 'react';
import {gql} from "apollo-boost";
import {Link} from "react-router-dom";
import './boards-list.css';
import AddBoard from "../AddBoard/AddBoard";
import {useMutation, useQuery} from "@apollo/react-hooks";
import toastr from "toastr";
import removeIcon from "../images/trash.png";


const GET_BOARDS_LIST = gql`
    query listBoards {
        allBoards {
            id
            name
            description
            columns {
                title
                color
                cards {
                    id
                }
            }
            posted_by {
                email
            }
            team {
                name
            }
        }
    }
`;

const REMOVE_BOARD_MUTATION = gql`
    mutation removeBoard($input: String!) {
        removeBoard(id: $input)
    }
`;

function BoardsList() {

    let { loading, error, data, refetch } = useQuery(GET_BOARDS_LIST);

    const [removeBoard, removeBoarddData] = useMutation(REMOVE_BOARD_MUTATION);

    if (removeBoarddData.error) {
        const errorMessage = removeBoarddData.error.graphQLErrors[0].message;
        removeBoarddData.error = null;
        toastr.options = {
            positionClass : 'toast-top-full-width',
            hideDuration: 300,
            timeOut: 6000,
            closeButton: true
        };
        toastr.clear();
        setTimeout(() => {
            toastr.error(errorMessage);
        }, 300);
    }

    if (removeBoarddData.data) {
        toastr.options = {
            positionClass : 'toast-top-full-width',
            hideDuration: 300,
            timeOut: 6000,
            closeButton: true
        };
        toastr.clear();
        setTimeout(() => {
            toastr.success('Successfully removed');
            refetch();
        }, 300);
    }

    const removeBoardHandler = (id) => {
        removeBoard({ variables: {input: id}});
    };

    const totalCardsReducer = (accumulator, column) => {
        if (column.title !== 'Actions') {
            accumulator += column.cards.length;
        }
        return accumulator;
    };

    const actionItemsReducer = (accumulator, column) => {
        if (column.title === 'Actions') {
            accumulator += column.cards.length;
        }
        return accumulator;
    };

    if (loading) {
        return "Loading...";
    }
    if (error) {
        return `Error! ${error.message}`;
    }


    return (
        <div className="BoardsList">
            <p>
                Boards list page
                <AddBoard/>
            </p>
            <div className="boards">
                {data.allBoards.map(board => (
                    <div className="board">
                        <p>
                            {board.team ? board.team.name : board.posted_by.email}
                            <button className="btn remove" onClick={e => removeBoardHandler(board.id)}><img alt="Remove" src={removeIcon} /></button>
                        </p>
                        <Link to={`/boards/${board.id}`}><p>{board.name}</p></Link>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default BoardsList;
