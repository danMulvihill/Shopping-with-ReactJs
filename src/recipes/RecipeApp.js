import React, { Component } from 'react';
// import List from './List';
import '../styles/RecipeApp.css'
import RecipeList from './RecipeList'
import RecipeInput from './RecipeInput'
import uuid from 'uuid';

class RecipeApp extends Component {
 
    state = {
      recipes: [
        {
          id: 0,
          title: "Spaghetti",
          ingredients: ["pasta", "spaghetti sauce"],
        },
        {
          id: 1,
          title: "PB&J Sandwiches",
          ingredients: ["Bread", "Peanut Butter", "Jelly"],
        },
        {
          id: 2,
          title: "Chocolate Chip Cookies",
          ingredients: ["Sugar", "Brown Sugar", "Flour", "Eggs", "Butter", "Vanilla Extract", "Chocolate Chips"],
        },
        {
          id: 3,
          title: "Keema Aloo",
          ingredients: ["Ground Beef","Ginger root", "Coriander", "Cilantro", "Cumin", "Tumeric", "Can diced tomatoes", "Potatoes", "Peas","Salt", "Garam masala"]
        },{
          id: 4,
          title: "Caeser Salad",
          ingredients: ["Romaine Lettuce", "Parmasean Cheese", "Caeser Dressing", "Croutons"]
        }
      
      ],
      nextRecipeId: uuid()   
    }
    
    


 //LocalStorage:
  componentDidMount() {
    // for all items in state
    for (let key in this.state) {
        // if the key exists in localStorage
        if (localStorage.hasOwnProperty(key)) {
          // get the key's value from localStorage
          let value = localStorage.getItem(key);
  
          // parse the localStorage string and setState
          try {
            value = JSON.parse(value);
            this.setState({ [key]: value });
          } catch (e) {
            // handle empty string
            this.setState({ [key]: value });
          }
        }
      }

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }


  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });

  }




    onSave = (recipe) => {
      this.setState((prevState) => {
        const newRecipe = {...recipe, id: this.state.nextRecipeId};
        return {
          nextRecipeId: prevState.nextRecipeId + 1,
          recipes: [...this.state.recipes, newRecipe],
         
        }
      });
    }
    
    onDelete = (id) => {
      const recipes = this.state.recipes.filter(r => r.id !== id);
      this.setState({recipes});
    }
    
    render() {
      // console.log(this.props.upRecipes.length)
      return (
        
        <div className="RecipeApp">

         <div className="container-fluid">
          <div className="row">
           
          <div className="col-sm-8">
          <RecipeList onDelete={this.onDelete} 
              recipes={this.state.recipes}
             
               />
          </div>
          <div className="col-sm-4">
          <h3>Add a recipe:</h3>
          <RecipeInput onSave={this.onSave} /> 
          </div>
          </div>
        </div></div>
      );
    }

  }
  
  export default RecipeApp;



