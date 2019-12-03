import React, {useState, useEffect} from 'react';

function AddColumnCard(props) {

    let [editMode, setEditMode] = useState(props.column === 'Actions');
    let [text, setText] = useState('');
    let textInput;

    useEffect(() => {
        if (textInput) {
            textInput.focus();
        }
    });

    const addCardHandler = () => {
        props.onAdd({
            column: props.column,
            text
        });
        setEditMode(false);
    };

    return (
        <div className="AddColumnBoard">
            {editMode ?
                <div className='card add-new-edit'>
                    <div tabIndex="-1" contentEditable={true} ref={(input) => textInput = input}  onInput={e => setText(e.currentTarget.innerHTML)}></div>
                    <button onClick={() => addCardHandler()}>ADD</button>
                </div> :
                <div className='card add-new' onClick={() => {setEditMode(true); console.log(textInput)}}>
                    <p>Add card</p>
                </div>
            }
        </div>
    );
}

export default AddColumnCard;
