import React from 'react';
import './App.css';

//React Router Dom
import { BrowserRouter as Router, Route } from 'react-router-dom'

//Components
import Timesheet from './Components/Timesheet'

import Home from "./Containers/Home.js"

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact={true} component={Home} />
        <Route path="/timesheet" component={Timesheet} />
      </div>
    </Router>
  );
}

export default App;
