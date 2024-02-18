import './App.css';
import { React ,useState, useEffect, useRef } from 'react';
import Control from './components/visbleControl';
import Button from './src/components/button';
import Input from './src/components/input';
const ShowInfo = ({blog, action}) => {
    return (
    <div>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>
            {blog.likes}
            <Button text={"like"} onClic={action}/>
        </p>
    </div>
    )
}

const DisplayBlogs = blogs  => {
    return (
      <div>
        {blogs.length > 0 && (blogs.map(blog => {
           return( <p>
                {blog.title}
                <Control 
                    children={ShowInfo} 
                    buttonLabel={"hide"}
                />

            </p>)
        })
        )}
      </div>
    );
  };

  const CreateBlog = ({blog, ref, action}) => {
    return (
        <Control 
            ref={ref}
            buttonLabel={"Create blog"}
            children={
                <div>
                    <Input placeholder={"Title"}/>
                    <Input placeholder={"Author"}/>
                    <Input placeholder={"url"}/>
                    <Button text={"Add"} onClic={action}/>
                </div>
        }
        />
    )
  }

  const LoginForm = ({action}) => {

    const [password, setPasword] = useState("")
    const [username, setUsername] = useState("")


    return(
      <div>
        <Input placeholder={"username"} value={username} onChange={e => setUsername(e.target.value)}/>
        <Input placeholder={"password"} value={password} onChange={e =>setPasword(e.target.value)}/>
        <Button text={"login"} onClic={action}/>
      </div>
    )
  }

  const UpgradeApp = () => {

    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)


    return (
        <>
        {user === null ?<LoginForm /> :<DisplayBlogs />}
        </>
    )

  } 
  

export default UpgradeApp;