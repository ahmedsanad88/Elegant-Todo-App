//jshint esversion:6
import React, { useEffect, useState } from 'react';
import './App.css';
import Todo from './Todo';
import { Button, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core';
import db from './firebase';
import firebase from "firebase";
import Particles from 'react-particles-js';
import { auth } from './firebase';
import Login from "./Login";
import Header from './Header';
import Footer from './Footer';
import AddBoxIcon from '@material-ui/icons/AddBox';

function App() {

  // handling all states for our todo app.
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);
  const [counter, setCounter] = useState(0);

  // using useEffect to handle login with google auth and user data.
    useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        // login 
        setUser((authUser) = ({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }));
      } else {
        setUser(null);
      }
    });
    return console.log("done");
  }, []);


  // Now we need to listen to database once app start to get update all todos and only once...
  useEffect(() => {    
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // and to get id for delete purpose we need id so we break it to an opject.
      // snapshot.docs.map(doc => console.log(doc.data()));
      setTodos(snapshot.docs.map(doc => ({
        id: doc.id,
        userid: doc.data().userid,
        todo: doc.data().todo,
        timestamp: doc.data().timestamp,
        checked: doc.data().checked,
      })));
    });
    // Cleaner
    return console.log('Yeah, Updated');
  }, [user]);

  // function to handle input with max length and update counter state
  const checkInput = (e) => {
    e.preventDefault();
    const tempInput = e.target.value;
    setCounter(tempInput.length);
    if (tempInput.length === 255) {
      alert("Reached to maximum numbers of letters");
    }
    setInput(e.target.value);
  };

  // adding todo function on submit.
  const addTodo = (event) => {
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      userid: user.uid,
      // now to sort the todos we need to add timestamp from firebase to be unique.
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      checked: false,
    });
    // setTodos([...todos, input]);
    setInput('');
    setCounter(0);
  };

  // converting time stamp into date.
  const convertTimestamp = (timestamp) => {
    let date = timestamp.toDate();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let yyyy = date.getFullYear();

    date = dd + '/' + mm + '/' + yyyy;
    return date;
  };
  
    // filtering all todos to show only this related by specific user.
    const selectedTodos = user && todos && todos.filter(todo => todo.userid === user.uid);
    // console.log(selectedTodos);
  

  return (
    user ?
    <div className="app">
      <Header user={user}/>
      <div className="app__main">
      {/* Main form to submit any note */}
        <form className="app__form">
          {/* <input value={input} onChange={e => setInput(e.target.value)}/> */}
          <FormControl className="app__input">
            <InputLabel style={{paddingLeft: "10px", color: "gray"}} htmlFor="my-input">Add Todo...</InputLabel>
            <Input style={{paddingLeft: "10px", paddingRight: "10px",color: "whitesmoke"}} className="app__input" value={input} onChange={checkInput} id="my-input" aria-describedby="my-helper-text" inputProps={{
              maxLength: 255
            }}/>
            
            <FormHelperText className="show__counter" style={{paddingLeft: "10px", paddingBottom: "5px", color: "whitesmoke", paddingTop: '10px'}} id="my-helper-text">✅ Organize your todo's.
            <span id="count">{counter}/255</span>
            </FormHelperText>
          </FormControl>
          <Button className="app__btn" disabled={!input} type='submit' onClick={addTodo} variant="contained" color="default" style={{borderRadius: '0 10px 10px 0', boxShadow: '0px 0px 5px rgba(256, 256, 256, 0.5)', color: 'gray'}}>
          <AddBoxIcon style={{fontSize: "35px", marginRight: "15px", marginLeft: "15px"}}/>
          </Button>
        </form>

        <ul className="app__todo">
        {/* Looping through all todos */}
          {selectedTodos && selectedTodos.map(todo => (
            <Todo key={todo.id} id={todo.id} todo={todo.todo} timestamp={todo.timestamp && convertTimestamp(todo.timestamp)} checked ={todo.checked}/>
          ))}
        </ul>
      </div>
      <Footer />
      {/* particles part */}
      <div className="particles__contact">
        <Particles 
          params={{ 
            particles: { 
              number: { 
                value: 80, 
                density: { 
                  enable: true, 
                  value_area: 800, 
                } 
              },
              "color": {
                "value": "#ffffff"
              },
              "shape": {
                "type": "circle",
                "stroke": {
                "width": 2,
                "color": "#ffffff"
              }},
              "size": {
                  "value": 10,
                  "random": true,
                  "anim": {
                      "enable": false,
                      "speed": 80,
                      "size_min": 0.1,
                      "sync": false
                  }
              },
              "line_linked": {
                "enable": false,
              },
              "move": {
                  "enable": true,
                  "speed": 2,
                  "direction": "bottom",
                  "random": false,
                  "straight": false,
                  "out_mode": "out",
                  "bounce": false,
                  "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                  }
                }
              },
          }
          } 
        /> 
      </div>
    </div>
    : <Login /> 
  );
}

export default App;
