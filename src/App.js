import React, { Component } from 'react';
import RecipeApp from "./RecipeApp";
//import ListApp from "./ListApp";
import Navbar from "./Navbar";
import List2App from "./List2"

class App extends Component {
  render() {
    return (
      <div id="app">
      <Navbar />
      <div id="recipes"><RecipeApp /></div>
      <div id="grocs"><List2App /></div>
        
        
      </div>
    )
  }
}

export default App


