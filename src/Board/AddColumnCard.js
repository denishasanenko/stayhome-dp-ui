import React from 'react';

class AddColumnCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            column: props.column,
            editMode: props.column === 'Actions',
            text: ''
        }
        console.log(props.column);
        this.addCardEmiter = props.onAdd;
        this.addCard = this.addCardHandler.bind(this, props.column);
    }

    toggleEditMode(mode) {
        console.log(this);
        this.setState({
            ...this.state,
            editMode: mode
        });
    };

    setText(text) {
        console.log(text, 'render');
        this.setState({
            ...this.state,
            text
        })
    };

    addCardHandler(column, text) {
        this.setState({
            ...this.state,
            text: ''
        })
        this.addCardEmiter({
            column,
            text
        })
        this.toggleEditMode(false);
    }

    render() {
        const {editMode} = this.state;
        return (
            <div className="AddColumnBoard">
                <div className={editMode ? 'hidden' : 'card add-new'} onClick={() => this.toggleEditMode(true)}>
                    <p>Add card</p>
                </div>
                <div className={!editMode ? ' hidden' : 'card add-new-edit'}>
                    <div contentEditable={true} onInput={e => this.setText(e.currentTarget.innerHTML)}></div>
                    <button onClick={() => this.addCard(this.state.text)}>ADD</button>
                </div>
            </div>
        );
    }
}

export default AddColumnCard;
