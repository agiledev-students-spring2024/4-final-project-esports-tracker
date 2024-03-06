import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from './pages/NavBar/NavBar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/swipe" element={<div> swipe</div>} />
          <Route path="/discover" element={<div> discover</div>} />
          <Route path="/add" element={<div> add</div>} />
          <Route path="message" element={<div> message</div>} />
          <Route path="/profile" element={<div> profile</div>} />
          {/* add pages above */}
        </Routes>
        <Navbar/>
      </Router>
    </div>
  );
}

export default App;
