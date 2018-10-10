import React, { Component } from 'react';
import Navbar from "./Navbar";
import './RecipeApp.css'

class RecipeApp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        recipes: [
          {
            id: 0,
            title: "Spaghetti",
            ingredients: ["pasta", "spaghetti noodles"],
            img: "spaghetti.jpg"
          }
        ],
        nextRecipeId: 3,
        showForm: true
      }
      
      this.handleSave = this.handleSave.bind(this);
      this.onDelete = this.onDelete.bind(this);
    }
    
    handleSave(recipe) {
      this.setState((prevState, props) => {
        const newRecipe = {...recipe, id: this.state.nextRecipeId};
        return {
          nextRecipeId: prevState.nextRecipeId + 1,
          recipes: [...this.state.recipes, newRecipe],
          showForm: true
        }
      });
    }
    
    onDelete(id) {
      const recipes = this.state.recipes.filter(r => r.id !== id);
      this.setState({recipes});
    }
    
    render() {
      const {showForm} = this.state;
      return (
        <div className="App">
        <Navbar onNewRecipe={() => this.setState({showForm: true})} />
          <h3>New Recipe</h3>
          { showForm ?
              <RecipeInput 
                onSave={this.handleSave}
                //onClose={() => this.setState({showForm: false})}  
              /> :
              null }
          <RecipeList onDelete={this.onDelete} recipes={this.state.recipes} />
        </div>
      );
    }
  }
  
  export default RecipeApp;

class Recipe extends Component{
    render(){
        const {title, img, details} = this.props;
        const ingredients = this.props.ingredients.map((ing,index) => ( 
            <li key={index}>{ing}</li>
        ))
        return(<div>
            
            <div>{title}</div>
            <ul>{ingredients}</ul>
            <p>{details}</p>
        </div>)
    }
}


class RecipeInput extends Component {
    static defaultProps = {
      onClose() {},
      onSave() {}
    }
    
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        instructions: "",
        ingredients: [''],
        img: ''
      };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleNewIngredient = this.handleNewIngredient.bind(this);
      this.handleChangeIng = this.handleChangeIng.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
      this.setState({[e.target.name]: e.target.value});
    }
    
    handleNewIngredient(e) {
      const {ingredients} = this.state;
      this.setState({ingredients: [...ingredients, '']});
    }
    
    handleChangeIng(e) {
      const index = Number(e.target.name.split('-')[1]);
      const ingredients = this.state.ingredients.map((ing, i) => (
        i === index ? e.target.value : ing
      ));
      this.setState({ingredients});
    }
    
    handleSubmit(e) {
      e.preventDefault();
      this.props.onSave({...this.state});
      this.setState({
        title: '',
        instructions: '',
        ingredients: [''],
        img: ''
      })
    }
    
    render() {
      const {title, instructions, img, ingredients} = this.state;
      const {onClose} = this.props;
      let inputs = ingredients.map((ing, i) => (
        <div
          className="recipe-form-line"
          key={`ingredient-${i}`}
        >
          <label>{i+1}.
            <input
              type="text"
              name={`ingredient-${i}`}
              value={ing}
              size={45}
              autoComplete="off"
              placeholder=" Ingredient"
              onChange={this.handleChangeIng} />
          </label>
        </div>
      ));
      
      return (
        <div className="recipe-form-container">
          <form className='recipe-form' onSubmit={this.handleSubmit}>

            <div className='recipe-form-line'>
              <label htmlFor='recipe-title-input'>Title</label>
              <input
                id='recipe-title-input'
                key='title'
                name='title'
                type='text'
                value={title}
                size={42}
                autoComplete="off"
                onChange={this.handleChange}/>
            </div>

            {inputs}
            <button
              type="button"
              onClick={this.handleNewIngredient}
              className="buttons"
            >
              +
            </button>
            <div className='recipe-form-line'>

            </div>
            <button
              type="submit"
              className="buttons"
              style={{alignSelf: 'flex-end', marginRight: 0}}
            >
              SAVE
            </button>
          </form>
        </div>
      )
    }
  }
  
  

  class RecipeList extends Component {

    
    render() {
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
  
 
