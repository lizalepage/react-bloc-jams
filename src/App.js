import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
        <header className="mdl-layout__header">
          <img className="bloc_logo" src="./assets/images/bloc_jams_logo.png" alt="bloc jams logo"/>
          <nav className="mdl-layout__tab-bar mdl-js-ripple-effect">
            <Link to='/' className="mdl-layout__tab is-active">Landing</Link>
            <Link to='/library' className="mdl-layout__tab">Library!</Link>
          </nav>
        </header>

        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
