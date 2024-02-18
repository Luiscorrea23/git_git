import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import Login from './components/Login';
import Cookies from 'js-cookie';

const App = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  return (
    <div className="App">
      {token ? <Menu /> : <Login/>}
    </div>
  );
}

export default App;
