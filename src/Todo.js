//jshint esversion:6
import { Button, Checkbox, Input, List, ListItem, ListItemText, makeStyles, Modal } from '@material-ui/core';
import React, { useState } from 'react';
import db from './firebase';
import "./Todo.css";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// using style for Material UI Modal.
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    width: 400,
    height: 400,
    backgroundColor: theme.palette.background.paper,
    border: '3px solid rgba(4, 55, 121, 0.6)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 10, 3),
  },
}));

function Todo(props) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [checked, setChecked] = useState(false);

    const updateTodo = (event) => {
        // Now we need to reset and update the input.
        db.collection('todos').doc(props.id).set({
            todo: input
        }, { merge: true });
        setInput('');
        setOpen(false);
    };

    return (
        <>
            {/* modal to modify any note. */}
            <Modal
            open={open}
            onClose={e => setOpen(false)}
            className={classes.modal}
            >
            <div className={classes.paper}>
                <h5>Apply any change and press save or press outside box to exit.</h5><br/>
                <Input placeholder={props.todo} value={input} onChange={e => setInput(e.target.value)}/><br/>
                <Button disabled={!input} onClick={updateTodo} color="primary" variant="outlined">Save</Button>
            </div>
            </Modal>
            {/* list of all todo details. */}
            <List className="todo__list">
                <ListItem>
                <ListItemText className="input__main" style={checked ? {textDecoration: "line-through"} : null} primary={ props.todo } secondary={props.timestamp} />
                <Checkbox
                    color="default"
                    value={props.todo}
                    onChange={(e) => setChecked(e.target.checked)}
                />
                </ListItem>
                {/* to delete todo inline */}
                <Button onClick={event => setOpen(true)}>Edit</Button>
                <Button onClick={event => db.collection('todos').doc(props.id).delete()}><DeleteForeverIcon /></Button>
            </List>
        </>
    )
}

export default Todo;
