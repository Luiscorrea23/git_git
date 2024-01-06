import React, { useState, useEffect } from 'react';
import services from '../services/services';
import login from '../services/loginServicesº'

const Anecdotas = (props) => {
  const { selected, anecdotas, onClick } = props;
  const selectedAnecdota = anecdotas[selected];
  const content = selectedAnecdota ? selectedAnecdota.content : "";
  console.log("selected: ", selectedAnecdota, "content:", content)
  return <h3>{content} <Button text={"Edit"} onClick={onClick}/> <Note note={content} toggleImportance={onClick}/></h3>
  ;
};

const DisplayAlert = ({ message }) => {
  if (message === null) {
   return null
  }

  return (
     <div className='error'>
       <p>{message}</p>
     </div>
  )
}

const Input = ({ placeholder, onChange, value }) => {
  return (
    <input required placeholder={placeholder} value={value} onChange={onChange} />
  );
};

const Note = ({ note, toggleImportance }) => {
  const label = note.important===true ? "make not important" : "make important";
  return (
      <button onClick={toggleImportance}>{label}</button>
  );
};

const DisplayNotes = ({ notes, state }) => {
  return (
    <ul>
      {Object.keys(notes).map((note) => {
        return <li key={note}>{`${note}:${notes[note]}` || "notes here"} </li>;
      })}
    </ul>
  )};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const CountVote = (dict_test, text) => {
  let copy = { ...dict_test };
  if (text in copy) {
    copy[text] += 1;
  } else {
    copy[text] = 1;
  }
  return copy;
};

const FindTheMostVote = (props) => {
  const { dict_test } = props;
  const values = Object.values(dict_test);
  const max = Math.max(...values);
  for (const [key, value] of Object.entries(dict_test)) {
    if (value === max) {
      return <p>{key} <strong>has {value} votes</strong></p>;
    }
  }
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(0);
  const [dict_test, setDictTest] = useState({});
  const [userInput, setUserInput] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [showAlert, setShowAlert] = useState(null);
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const getData = () => {
      services
        .getAll()
        .then(response => {
          setNotes(response.data);
      })
      .catch(error => console.log("fail:", error));
  };

  const handleInputChange = event => {
    setUserInput(event.target.value);

  };

  const postData = async (event) => {
    event.preventDefault();
    const parametros = {
      content: userInput,
      date: new Date(),
      important: Math.random() > 0.5
    };
  
    try {
      const response = await services.create(parametros);
      setNotes(notes.concat(response.data));
      setUserInput("");
    } catch (error) {
      setShowAlert(`Error creating note: ${error.message}`);
      setTimeout(() => {
        setShowAlert(null);
      }, 5000);
    }
  };

  const loginUser = async () => {
    const user = {
      username: username, 
      password: password
    }
    try {
      await login.loginUser(user)
      console.log()
    } catch (error) {
      console.log("Error login:", error)
    }
  }

  const toggleImportance = async (id) => {
    const note = notes.find(n => n.id === id);
    const changeNote = { ...note, important: !note.important };
  
    try {
      const response = await services.update(note.id, changeNote);
      setNotes(notes.map(n => (n.id === id ? response.data : n)));
    } catch (error) {
      setShowAlert(`Error updating note: ${error.message}`);
      setTimeout(() => {
        setShowAlert(null);
      }, 5000);
    }
  };


  useEffect(getData, []);

  useEffect(() => {
    console.log("dict test updated:", dict_test);
  }, [dict_test]);

  useEffect(() => {
    console.log("vote updated:", dict_test[notes[selected]?.content]);
  }, [notes, selected, dict_test]);

  useEffect(() => {
    console.log("add new note, notes updated: ", notes);
  }, [notes]);

  return (
    <>
      <DisplayAlert message={showAlert}/>
      <h3>Login</h3>
      <Input placeholder={"username"} onChange={event => setUsername(event.target.value)} value={username} />
      <Input placeholder={"password"} onChange={event => setPassword(event.target.value)} value={password}/>
      <Button text={"login"} onClick={() => loginUser}/>
      <form onSubmit={postData}>
        <Input placeholder={"your note here"} onChange={handleInputChange} value={userInput} />
        <Button type="submit" text="add" />
      </form>
      <Anecdotas anecdotas={notes} selected={selected} onClick={() => toggleImportance(notes[selected].id)} />
      <p>Has {dict_test[notes[selected]?.content] || 0} votes</p>
      <Button text={"nextAnecdota"} onClick={() => setSelected(Math.floor(Math.random() * notes.length))} />
      <Button text={"Vote"} onClick={() => setDictTest(CountVote({ ...dict_test }, notes[selected].content))} />
      <Button text={"Show notes"} onClick={() => setShowNotes(true)} />
      <Button text={"Less notes"} onClick={() => setShowNotes(false)} />
      <FindTheMostVote dict_test={dict_test} />
      {showNotes && <DisplayNotes notes={dict_test} />}
    </>
  );
};

export default App;