import './App.css';
import { React ,useState, useEffect, useRef } from 'react';
import * as services from './services/routes_services'; // Importa el módulo services
import login_services from './services/login_services';
import Control from './components/VisibleControl';
//import DisplayInfo from './components/display_titles';

const Input = ({value, onChange, placeholder}) => {
  return (
    <div>
      <input required placeholder={placeholder} value={value} onChange={onChange}></input>
    </div>
  )
}

const DisplayMost = ({blog, state}) => {
  if (state === true){
      return (<div key={blog.id}>
        <h3>Blog most likes</h3>
        <p> Author: {blog.author}</p>
        <p>Title: {blog.title}</p>
        <p>Likes: {blog.likes}</p>
      </div>)
  }
  return null
}

const DisplayTitles = ({ blogs, state, ref, like, del}) => {
  if (state) {
    return (
      <>
        <h3>Blogs</h3>
          {blogs.map((blog, index) => (
            <p>{blog.title}
            <Control 
              buttonLabel={"hide"}
              refs= {ref}
              children={
                <div>
                  <p> Author: {blog.author}</p>
                  <p>Title: {blog.title}</p>
                  <p>Likes: {blog.likes}  < Button text="Like" onClic={like}/> <Button text={"delete"} onClic={del}/> </p>
                </div>
              }
            /> </p>
          ))} 
      </>
    );
  }

  return null;
}

const Alert = ({ message, state }) => {
  return state ? <div className='alert'><p>{message}</p></div> : null
}

const DisplayInfo = ({ blogs, currentIndex }) => {
  return (
    <>
      {blogs.length > 0 && (
        <div key={blogs[currentIndex].id} >
          <h3>Title: {blogs[currentIndex].title}</h3>
          <p>Author: {blogs[currentIndex].author}</p>
          <p>Url: {blogs[currentIndex].url}</p>
          <p>Likes: {blogs[currentIndex].likes}</p>
        </div>
      )}
    </>
  );
};

const Button = ({text, onClic}) => {
  return <button onClick={onClic}>{text}</button>
}


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [author, setAuthor] = useState("")
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [alert, setAlert] = useState("")
  const [showAlert, setShowAlert] = useState(null)
  const [showMost, setShowMost] = useState(false)
  const [mostLikedBlog, setMostLikedBlog] = useState(null);
  const [showTitles, setShowTitles] = useState(false)
  const [titles, setTitles] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPasword] = useState("")
  const [user, setUser] = useState(null)
  const controlRef = useRef()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await services.getData();
        console.log("GET OK:", data.data)
        setBlogs(data.data);
      } catch (error) {
        console.error("Error en getData:", error);
      }
    };

    fetchData();
  }, [user]);

  const clearInputs = () => {
    setAuthor("")
    setTitle("")
    setUrl("")
  }

  const deleteData = async (id) => {
    window.confirm("¿quieres elminar el blog?")
    await services.deleteData(id)
    setShowAlert(true)
    setAlert("delete blog succesfull")
    console.log("DELETE OK")
    handleNextBlog()
  }

  const postData = async () => {
    try {
      const blog = {
        "title": title,
        "author": author, 
        "url": url 
      }

      if (controlRef.current) {
        controlRef.current.controlVisible();
        console.log("se ejecuta controlVisible")
      }

      const postData = await services.postData(blog)
      setShowAlert(true)
      setAlert("add blog succesfull")
      console.log("POST OK:", postData)
      clearInputs()
    }
    catch(error) {
      console.error("error postData:", error)
      setShowAlert(true)
      setAlert("Debes complertar todos los campos")
    }
  }
  useEffect(() => {
    setTimeout(()=>{
      setShowAlert(false)
      setAlert("")
    }, 5000)
  }, [alert])


  useEffect(() => {
    console.log("actual value 2", currentIndex)
  }, [currentIndex])

  const handleNextBlog = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % blogs.length);
  };

  const like = async (id) => {
    try {
    console.log("clicked like")
    const updatedLikes = blogs[currentIndex].likes + 1; // Incrementa los likes
    const blogUpdate = {
      "title": blogs[currentIndex].title,
      "author": blogs[currentIndex].author, 
      "url": blogs[currentIndex].url,
      "likes": updatedLikes // Asigna el valor incrementado
    }
    const updatedBlog = await services.updateData(id, blogUpdate)

    setBlogs(prevBlogs => {
      const updatedBlogs = [...prevBlogs];
      updatedBlogs[currentIndex] = updatedBlog.data; // Usa la respuesta actualizada de la API
      return updatedBlogs;
    })}
     catch (error) {
    console.error("Error en la petición de actualizar likes:", error);
    }
  }

  const mostLike = () => {
    const likes = Math.max(...blogs.map(blog => blog.likes))
    console.log(likes)
    const mostLikes = blogs.find(blog => blog.likes === likes)
    console.log(mostLikes)
    setShowMost(true)
    setMostLikedBlog(mostLikes)
  }

  const obteinTitles = (blogs) => {
    const newTitles = blogs.map(blog => blog.title)
    setTitles(newTitles)
    setShowTitles(true)
  }

  const loginUser  = async () => {
    const credentials = {
      username: username, 
      password: password
    }

    try {
      const user = await login_services.login(credentials)
      window.localStorage.setItem("userStorage", JSON.stringify(user))
      services.setToken(user.data.token)
      setUser(user)
      setUsername("")
      setPasword("")
      setShowAlert(true)
      setAlert("login succesfull")
    } catch (error) {
      console.log("usuario or password invalid:", error)
      setAlert("usuario or password invalid:")
    }
  } 
  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userStorage')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      services.setToken(user.data.token)
    }
  }, [])

  return (
    <div>
      <Alert message={alert} state={showAlert}/>
      {user === null
      ? <div>
        <Input placeholder={"username"} value={username} onChange={e => setUsername(e.target.value)}/>
        <Input placeholder={"password"} value={password} onChange={e =>setPasword(e.target.value)}/>
        <Button text={"login"} onClic={() => loginUser()}/>
      </div>
      : <div>
        <h3>{user.author} logged in</h3>
        <Button text={"logout"} onClic={logOut}/>
        <Control 
        ref={controlRef}
        buttonLabel = {"New Note"}
        children = {
          <div>
            <h4>Complete dates for blog</h4>
            <Input placeholder={"Author"} value={author} onChange={e => setAuthor(e.target.value)}/>
            <Input placeholder={"Title"} value={title} onChange={e => setTitle(e.target.value)}/>
            <Input placeholder={"Url"} value={url} onChange={e => setUrl(e.target.value)}/>
            <Button text={"create"} onClic={postData} />
          </div>
        } />
        <DisplayInfo blogs={blogs} currentIndex={currentIndex} />
        < Button text="Next Blog" onClic={handleNextBlog} />
        < Button text="Delete" onClic={()=> deleteData(blogs[currentIndex].id)} />
        < Button text="Like" onClic={()=>like(blogs[currentIndex].id)} />
        <Button text="Blog Most Likes" onClic={()=>mostLike()} />
        <Button text="All Blogs Titles" onClic={() => obteinTitles(blogs)} />
        < DisplayMost blog={mostLikedBlog} state={showMost} />
        <DisplayTitles blogs={blogs} state={showTitles} ref={controlRef} like={()=>like(blogs[currentIndex].id)} del={() => deleteData(blogs[currentIndex].id)}/>
      </div>
      }
    </div>
  );
};

export default App;
