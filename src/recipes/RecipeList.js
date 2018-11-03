import React, { Component } from 'react'
import Recipe from './Recipe'

export default class RecipeList extends Component {

    
    render() {
      console.log("list test:"+this.props.upRecipes)
      const {onDelete} = this.props;
      const recipes = this.props.recipes.map((r,index) => (
        <Recipe key={r.id} {...r} onDelete={onDelete} />
      ));
      
      return (
        <div className="recipe-list">
        {recipes}
         
        </div>
      )
    
    }
  }
  
 
