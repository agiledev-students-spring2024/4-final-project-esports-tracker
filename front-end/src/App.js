import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Navbar from './pages/NavBar/NavBar';
import Message from './pages/Message/Message';
import Swipe from './pages/Swipe/Swipe';
import Add from './pages/Add/Add';
import Profile from './pages/Profile/Profile';
import Post from './pages/Feed/Post';
import Discover from './pages/Discover/Discover';
import Feed from "./pages/Feed/Feed";
import EditProfile from './pages/Profile/EditProfile';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import useAuth from './hooks/useAuth';

const roles = {
  "User": 1
}

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
        <Routes>
          <Route path="/login" element={!user ? <Login/> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register/> : <Navigate to="/" />} />
          <Route path="/profile" element={user?<Profile/>:<Navigate to="/login" />} />
          <Route path="/swipe" element={user? <Swipe/>:<Navigate to="/login" />} />
          <Route path="/feed" element={user?<Feed />:<Navigate to="/login" />} />
          <Route path="/discover" element={user?<Discover/>:<Navigate to="/login" />} />
          <Route path="/add" element={user?<Add/>:<Navigate to="/login" />} />
          <Route path="message" element={user?<Message/>:<Navigate to="/login" />} />
          <Route path="/editProfile" element={user?<EditProfile/>:<Navigate to="/login" />} />
          <Route path="/post/:postId" element={user?<Post/>:<Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/feed" />} />


          {/* add pages above */}
        </Routes>
        <Navbar />
    </div>
  )
}

export default App
