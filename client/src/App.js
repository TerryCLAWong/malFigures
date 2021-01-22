import React, { Component }  from 'react';
import {HashRouter} from "react-router-dom";
//Styles
import './App.sass';
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
          <section className = "section">
            <div className = "columns">
              <div className="column is-one-fifth">
                <div className = "box">
                  <Navigation/>
                </div>
              </div>
              <div className="column">
                <div className = "box">
                  <Content/>
                </div>
              </div>
            </div>
          </section>


          
          
        </div>
      </HashRouter>
    )
  }
}

export default App;
