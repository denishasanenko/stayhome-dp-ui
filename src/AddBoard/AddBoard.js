import React, {useState} from 'react';
import {gql} from "apollo-boost";
import {useHistory} from "react-router-dom";
import {useMutation} from "@apollo/react-hooks";
import toastr from "toastr";

const ADD_BOARD_MUTATION = gql`
    mutation postBoard($input: PostBoardInput!) {
        postBoard(input: $input) {
            id
        }
    }
`;

function AddBoard() {
    const [inProcess, setInProcess] = useState(false);
    const [title, setTitle] = useState('');
    let history = useHistory();

    const [addBoard, addBoardData] = useMutation(ADD_BOARD_MUTATION);

    if (addBoardData.error) {
        const errorMessage = addBoardData.error.graphQLErrors[0].message;
        addBoardData.error = null;
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

    if (addBoardData.data) {
        history.push(`/boards/${addBoardData.data.postBoard.id}`)
    }

    const addBoardHandler = () => {
        addBoard({ variables: {input: { name: title}}});
        setInProcess(false);
    };

    return (
        <div className="AddBoard">
            {inProcess ?
                <div className="board-add">
                    <input type="text" onChange={e => setTitle(e.target.value)}/>
                    <p onClick={addBoardHandler}>+</p>
                </div> :
                <div className="board-add" onClick={e => setInProcess(true)}>
                    +
                </div>
            }


        </div>
    );
}

export default AddBoard;
