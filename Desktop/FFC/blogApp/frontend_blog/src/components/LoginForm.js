import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { useUser } from '../UserContext'; // Importamos el hook de contexto

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { loginUser } = useUser(); // Usamos el hook de contexto

  const login = async () => {
    const credentials = {
      username: username,
      password: password
    };

    try {
      // Llamamos a la función loginUser proporcionada por el contexto
      loginUser(credentials);
      console.log("Login successful");
    } catch (error) {
      console.log("Invalid username or password");
    }
  };

  return (
    <div>
      <Input placeholder={"username"} value={username} onChange={e => setUsername(e.target.value)} />
      <Input placeholder={"password"} value={password} onChange={e => setPassword(e.target.value)} />
      <Button text={"login"} onClic={() => login()} />
    </div>
  );
};

export default LoginForm;