import { useState } from 'react'
import Input from "./input"
import Button from "./button"
import {useUser} from '../hooks/UserCont';


const LoginForm = () => {

    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const { loginUser } = useUser();

    const loginFunc = async () => {
      
        const credentials = {
          username: username,
          password: password,
        };
      
        try {
          const response = await loginUser(credentials);
          console.log("Respuesta del servidor:", response);
          
          if (response && response.data) {
            console.log('Login successful');
            console.log('User info:', response.data);
          } else {
            console.log('Invalid username or password');
          }
        } catch (error) {
          console.error('Error en la solicitud de login:', error.message);
          console.log('Respuesta del servidor:', error.response);
          console.log('Invalid username or password');
        }
      };
  
  return (
    <div className='login'>
        <Input placeholder={"username"} onChange={e => setUsername(e.target.value)} value={username} />
        <Input placeholder={"password"} onChange={e => setPassword(e.target.value)} value={password}/>
        <Button text={"login"} onClick={() => loginFunc()}/>
    </div>
  )
  }

  export default LoginForm