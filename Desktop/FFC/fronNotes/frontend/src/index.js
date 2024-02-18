import React from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from './hooks/UserCont';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { NotesProvider } from './hooks/NotesCont';
import App from './App';



ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();