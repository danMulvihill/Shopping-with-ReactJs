import React, { Component } from 'react'
import './Navbar.css'

export class Navbar extends Component {
  displayRecipes(){
        console.log("recipes:"+document.querySelector("#recipes").style.display);
        //document.querySelector("#recipes").style.disply = "block";
        //document.querySelector("#root").style.display="none";
       
        window.location.reload();
    }
  displayShopping(){
        console.log("shopping:"+document.querySelector("#shopping"));
        document.querySelector("#root").style.display="block";
        document.querySelector("#recipes").style.display="none";
    }
  render() {
    return (
      <header>
        <h2><a>Shopping Buddy</a></h2>
        <nav>
            <li><a onClick={this.displayRecipes}>Recipes</a></li>
            <li><a onClick={this.displayShopping}>Shopping List</a></li>
            <li><a>About</a></li>
        </nav>
      </header>
    )
  }
}

export default Navbar
