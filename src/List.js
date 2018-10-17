import React, { Component } from 'react'



class RecipeApp extends Component {
    constructor(props) {
      super(props);
      this.onSave = this.onSave.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.state = {
        recipes: [
          {
            id: 0,
            title: "Eggs",
            section: "Refrigerated",
            ingredients: []
          },
          {
            id: 1,
            title: "Bananas",
            section: "Produce",
            ingredients: []
          }
        ],
        nextRecipeId: 2     
      }
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




    onSave(recipe) {
      this.setState((prevState) => {
        const newRecipe = {...recipe, id: this.state.nextRecipeId};
        return {
          nextRecipeId: prevState.nextRecipeId + 1,
          recipes: [...this.state.recipes, newRecipe],
         
        }
      });
    }
    
    onDelete(id) {
      const recipes = this.state.recipes.filter(r => r.id !== id);
      this.setState({recipes});
    }
    
    render() {
      // console.log(this.props.upRecipes.length)
      return (
        
        <div className="App">

         <div className="container">
          
          
          <h3>Add a recipe:</h3>
          
          <RecipeList onDelete={this.onDelete} 
              recipes={this.state.recipes} />
              <RecipeInput onSave={this.onSave} /> 
        </div></div>
      );
    }

  }
  
  export default RecipeApp;



class Recipe extends Component{
    render(){
        const {title, id, section, onDelete} = this.props;
        
        return(<div>
            
            <div>{title} {section}</div>
            
            <button type="button" onClick={() => onDelete(id)}>delete recipe</button>
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
        ingredients: [''],
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
                onChange={this.handleChange}/>
            </div>
            List ingredents:
            {inputs}
            <button
              type="button"
              onClick={this.handleNewIngredient}
              className="buttons"
            >
              +
            </button>
 
            <button
              type="submit"
              className="buttons"
              style={{alignSelf: 'flex-end', marginRight: 0}}
            >
              save recipe
            </button>

          </form>
        </div>
      )
    }
  }
  
  

  class RecipeList extends Component {

    
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
  
 



// export default class List extends Component {

//     static defaultProps = {
//         sections: ["Produce", "Refrigerated", "Frozen", "Pharma", "Other Food", "Other items (not food)"]
//       };
    
//       constructor(props) {
//         super(props);
//         this.state = {
//           list: [
//               { 
//                 id: 0,
//                 ingredient: 'Eggs',
//                 quantity: 1,
//                 section: 'Refrigerated'
//               },
//           ],
//           newItem: "",
//           newQuantity: 1,
//           newSection: ''
//         };
//       }
    
    
//       componentDidMount() {
//         // for all items in state
//         for (let key in this.state) {
//             // if the key exists in localStorage
//             if (localStorage.hasOwnProperty(key)) {
//               // get the key's value from localStorage
//               let value = localStorage.getItem(key);
      
//               // parse the localStorage string and setState
//               try {
//                 value = JSON.parse(value);
//                 this.setState({ [key]: value });
                
//               } catch (e) {
//                 // handle empty string
//                 this.setState({ [key]: value });
//               }
//             }
//           }
    
//         // add event listener to save state to localStorage
//         // when user leaves/refreshes the page
//         window.addEventListener(
//           "beforeunload",
//           this.saveStateToLocalStorage.bind(this)
//         );
//       }
    
//       componentWillUnmount() {
//         window.removeEventListener(
//           "beforeunload",
//           this.saveStateToLocalStorage.bind(this)
//         );
    
//         // saves if component has a chance to unmount
//         this.saveStateToLocalStorage();
//       }
    
    
//       saveStateToLocalStorage() {
//         // for every item in React state
//         for (let key in this.state) {
//           // save to localStorage
//           localStorage.setItem(key, JSON.stringify(this.state[key]));
//         }
//       }
    
//       updateInput(key, value) {
//         // update react state
//         this.setState({ [key]: value });
    
//       }




  
//   render() {
    
//     console.log(this.state.list)
//     let listitems;
//     if(this.state.list){
//         listitems = this.state.list.map(l=>{
//             return <div> 
//                 {l.quantity} {l.value} {l.section}
//                 </div>
//         })
//     }
//     return (
//       <div>
//         <div className="App">
//             <div className="container">
//                 {listitems}
//             </div>
//         </div>
//       </div>
//     )
//   }
// }


// class ListItem extends React.Components{
//     constructor(props) {
//         super(props);
//     }
//     render(){
//         return(
//             <div className="">
//                   Test
//             </div>
//         )
//     }
// }