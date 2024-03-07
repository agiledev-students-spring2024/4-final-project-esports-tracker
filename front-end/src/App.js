import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Navbar from './pages/NavBar/NavBar';
import Message from './pages/Message/Message';
import Swipe from './pages/Swipe/Swipe';
import Add from './pages/Add/Add';
import Profile from './pages/Profile/Profile';
import Discover from './pages/Discover/Discover';
<<<<<<< HEAD
import Login from './pages/Login/Login';
=======
import Feed from "./pages/Feed/Feed"
import EditProfile from './pages/Profile/EditProfile';
>>>>>>> ee3c32eefe86ada2b8741d39272a8d2860dd1d45

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/feed" />} />
          <Route path="/swipe" element={<Swipe/>} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/discover" element={<Discover/>} />
          <Route path="/add" element={<Add/>} />
          <Route path="message" element={<Message/>} />
          <Route path="/profile" element={<Profile/>} />
<<<<<<< HEAD
          <Route path="/Login" element={<Login/>} />
=======
          <Route path="/editProfile" element={<EditProfile/>} />
>>>>>>> ee3c32eefe86ada2b8741d39272a8d2860dd1d45
          {/* add pages above */}
        </Routes>
        <Navbar />
      </Router>
    </div>
  )
}

export default App
