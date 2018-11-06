import React, { Component } from 'react'


export default class RecipeInput extends Component {
    static defaultProps = {
      onClose() {},
      onSave() {}
    }
    

    state = {
        title: '',
        ingredients: [''],
      }  

    
    
    handleChange = (e) =>{
      this.setState({[e.target.name]: e.target.value});
    }
    
    handleNewIngredient = (e) =>{
      const {ingredients} = this.state;
      this.setState({ingredients: [...ingredients, '']});
    }
    
    handleChangeIng = (e) =>{
      const index = Number(e.target.name.split('-')[1]);
      const ingredients = this.state.ingredients.map((ing, i) => (
        i === index ? e.target.value : ing
      ));
      this.setState({ingredients});
    }
    
    handleSubmit = (e) =>{
      e.preventDefault();
      this.props.onSave({...this.state});
      this.setState({
        title: '',
        ingredients: [''],
      })
    }
    
    render() {
      const {title, ingredients} = this.state;
      //const {onClose} = this.props;
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
              <label htmlFor='recipe-title-input'>title:</label>
              <br />
              <input
                id='recipe-title-input'
                key='title'
                name='title'
                type='text'
                value={title}
                autoComplete="off"
                onChange={this.handleChange}
                required
                />
            </div>
            List ingredents:
            {inputs}
            <button
              type="button"
              onClick={this.handleNewIngredient}
              className="btn btn-warning"
            >
              +
            </button>
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ffontSize: "1.6rem", marginTop: "40px"}}
            >
              save recipe
            </button>

          </form>
        </div>
      )
    }
  }
  
  
