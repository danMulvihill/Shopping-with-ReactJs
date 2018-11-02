import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

import './styles/Navbar.css'

export class Navbar extends Component {

  // displayRecipes =() =>{
  //       console.log("recipes:"+document.querySelector("#recipes"));
  //       document.querySelector("#recipes").style.display = "block";
  //       document.querySelector("#grocs").style.display="none";
       
  //       //window.location.reload();
  //   }
  // displayShopping=()=>{
  //     document.querySelector("#recipes").style.display="none";
  //       console.log("shopping:"+document.querySelector("#grocs"));
  //       document.querySelector("#grocs").style.display="block";    
  //  }


  render() {
    return (
      <header>
        <h2><a href="/">Shopping Buddy</a></h2>
        <nav>
            <li><NavLink to="/about" activeClassName="is-active">About this site</NavLink></li>
            <li><NavLink to="/recipes" activeClassName="is-active">Recipes</NavLink></li>
            <li><NavLink to="/groceries" activeClassName="is-active">Shopping List</NavLink></li>       
        </nav>
      </header>
    )
  }
}

export default Navbar
