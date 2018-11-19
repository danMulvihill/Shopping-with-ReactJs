import React, { Component } from 'react'
import Recipe from './RecipeListItem'

export default class RecipeList extends Component {

    
    render() {
      console.log("list test:"+this.props.upRecipes)
      const {onDelete} = this.props;
      const recipes = this.props.recipes.map((recipe) => (
        <Recipe 
          key={recipe.id} 
          //{...recipe}
          title ={recipe.title}
          details = {recipe.details}
          ingredients = {recipe.ingredients} 
          onDelete={onDelete} 
      
        />
      ));
      
      return (
        <div className="recipe-list">
        {recipes}
         
        </div>
      )
    
    }
  }
  
 
