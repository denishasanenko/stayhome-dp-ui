import React, {useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import {gql} from "apollo-boost";
import {useMutation, useQuery} from 'react-apollo'
import "./board.css"
import AddColumnCard from './AddColumnCard';
import toastr from 'toastr'
import actionItemIcon from '../images/idea.png';

const ADD_CARD_MUTATION = gql`
    mutation postCard($input: PostBoardCardInput!) {
        postCard(input: $input) {
            text
        }
    }
`;
const GET_BOARD = gql`
    query getBoard($id: String!) {
        getBoard(id: $id) {
            id
            name
            description
            columns {
                title
                color
                cards {
                    id
                    text
                }
            }
            posted_by {
                email
            }
        }
    }
`;

function Board() {

    let { id } = useParams();
    let [actionAdding, setActionAdding] = useState(false);
    let [parentForAction, setParentForAction] = useState('');

    let { loading, error, data, refetch } = useQuery(GET_BOARD, {
        variables: {id: id}
    });

    let [addCardMutation, addData] = useMutation(ADD_CARD_MUTATION);


    const addCard = async function (card) {
        await addCardMutation(
            { variables: {input: { ...card, board_id: id, parent: parentForAction }}}
        );
        setActionAdding(false);
        refetch();
    }

    const addAction = function (event, card) {
        event.preventDefault();
        console.log(card);
        setParentForAction(card.id);
        setActionAdding(true);
    }

    if (addData.error) {
        toastr.options = {
            positionClass : 'toast-top-full-width',
            hideDuration: 300,
            timeOut: 6000,
            closeButton: true
        };
        toastr.clear();
        setTimeout(() => toastr.error(addData.error.networkError.result.errors[0].message), 300);

    }

    if (loading) return null;
    if (error) return `Error! ${error}`;

    return (
        <div className="Board">
            <Link to="/list">Back boards list</Link>
            <p>
                {data.getBoard.name}
            </p>

            <div className="wrapper">
                <div className="canvas clearfix" style={{width: `${data.getBoard.columns.length * 422}px`}}>
                    {data.getBoard.columns.map((column) => {
                        return <div className="column">
                            <p><b>{column.title}</b></p>

                            { column.title !== 'Actions' || actionAdding ? <AddColumnCard column={column.title} onAdd={addCard} /> : '' }

                            {column.cards.map((card) => {
                                return <div className="card">
                                    <p>
                                        {card.text}
                                        <button className="btn" onClick={e => {addAction(e, card)}}>
                                            <img src={actionItemIcon} />
                                        </button>
                                    </p>
                                </div>
                            })}
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default Board;
