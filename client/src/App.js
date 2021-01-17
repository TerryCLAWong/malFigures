import React, { Component }  from 'react';
import {HashRouter} from "react-router-dom";
//Styles
import './App.css';
//Components
import Content from './components/content/content'
import Navigation from './components/navigation/navigation'
import Banner from './components/banner/banner'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Banner/>
          <Navigation/>
          <Content/>
        </div>
      </HashRouter>
    )
  }
}

export default App;
