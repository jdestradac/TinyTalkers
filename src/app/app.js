// src/pages/app.js

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import Blog from '../components/Blog';

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Inicio</Link> | 
        <Link to="/about">Acerca de</Link> | 
        <Link to="/blog">Blog</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}
