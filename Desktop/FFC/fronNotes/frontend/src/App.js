import { LoginForm, Button, CreateNote, DisplayNotes } from './components/barredFile';
import { useUser } from './hooks/UserCont';

const App = () => {
  const { logoutUser, token } = useUser();
  
  return (
    <>
      {token === null
        ? <LoginForm />
        : <div>
            <Button text={"logout"} onClic={() => logoutUser()} />
            <CreateNote token={token}/>
            <DisplayNotes token={token} />
          </div>
      }
    </>
  );
};

export default App;
