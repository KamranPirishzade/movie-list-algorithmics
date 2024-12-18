import './App.css';
import Navbar from './components/Navbar';
import Movies from './components/Movies';
import List from './components/List';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
