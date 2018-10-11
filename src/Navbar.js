import React, { Component } from 'react'
import './Navbar.css'

export class Navbar extends Component {
  displayRecipes =() =>{
        console.log("recipes:"+document.querySelector("#recipes"));
        document.querySelector("#recipes").style.display = "block";
        document.querySelector("#grocs").style.display="none";
       
        //window.location.reload();
    }
  displayShopping=()=>{
      document.querySelector("#recipes").style.display="none";
        console.log("shopping:"+document.querySelector("#grocs"));
        document.querySelector("#grocs").style.display="block";
        
        
        
    }
  render() {
    return (
      <header>
        <h2><a href="/">Shopping Buddy</a></h2>
        <nav>
            <li><a onClick={this.displayRecipes}>Recipes</a></li>
            <li><a onClick={this.displayShopping}>Shopping List</a></li>
            
        </nav>
      </header>
    )
  }
}

export default Navbar
