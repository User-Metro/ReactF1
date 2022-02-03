//import './App.css';
import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import Hello from "./componentes/hello.js";
import Formula1 from "./componentes/formula1.js";
import PilotosF1 from "./componentes/pilotos.js";

//importamos nuestros css
import "./css/tablasF1.css";
import "./css/menu.css";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <ul>
            <li>
              <a>
                <Link to="/">Home</Link>
              </a>
            </li>
            <li>
              <a>
                <Link to="/formula">GP</Link>
              </a>
            </li>
            <li>
              <a>
                <Link to="/pilotos">Pilotos</Link>
              </a>
            </li>
          </ul>

          <Routes>
            <Route exact path="/" element={<Hello />} />
            <Route exact path="/formula" element={<Formula1 />} />
            <Route exact path="/pilotos" element={<PilotosF1 />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;