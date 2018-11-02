import React, { Component } from 'react'
import { createStore } from 'redux';

const store = createStore((state={count:0}) =>{ return state; })

console.log(store.getState());

class ListApp extends Component {
    constructor(props) {
      super(props);
      this.onSave = this.onSave.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.state = {
        grocs: [
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
        nextGrocId: 2     
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




    onSave(grocs) {
      this.setState((prevState) => {
        const newGroc = {...grocs, id: this.state.nextGrocId};
        return {
          nextGrocId: prevState.nextGrocId + 1,
          grocs: [...this.state.grocs, newGroc],
         
        }
      });
    }
    
    onDelete(id) {
      const grocs = this.state.grocs.filter(r => r.id !== id);
      this.setState({grocs});
    }
    
    render() {
      // console.log(this.props.upGrocs.length)
      return (
        
        <div className="App">

         <div className="container">
          
          
          <h3>List groceries here:</h3>
          <GrocInput onSave={this.onSave} /> 
          <GrocList onDelete={this.onDelete} 
              grocs={this.state.grocs} />
          
        </div></div>
      );
    }

  }
  
  export default ListApp;



class Groc extends Component{
    render(){
        const {title, id, section, onDelete} = this.props;
        
        return(<li key={id} className="list-item">
            <div className="list-item">
            <div className="list-item__container">
              <div>
                {title}
              </div>
              <div>
                <span className="section-display">{section}</span>
                <button type="button"
                className = "button x-button" 
                onClick={() => onDelete(id)}>          
                X
                </button>
               </div>
            </div>
        </div></li>)
    }
}


class GrocInput extends Component {
    static defaultProps = {
      onClose() {},
      onSave() {}
    }
    
    constructor(props) {
      super(props);
      this.state = {
        title: '',
        section: '',
        ingredients: [''],
      };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleNewIngredient = this.handleNewIngredient.bind(this);
      this.handleChangeIng = this.handleChangeIng.bind(this);
      this.handleChangeSec = this.handleChangeSec.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
      this.setState({[e.target.name]: e.target.value});
    }

    handleChangeSec(e) {
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
        section: '',
        ingredients: [''],
      })
    }
    
    render() {
      const {title, ingredients, section} = this.state;
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
    //   let sectionOptions = section.map(section =>{
    //     return <option key={section} value="section">{section} </option> 
    //   }) 
      return (
        <div className="recipe-form-container">
          <form className='recipe-form' onSubmit={this.handleSubmit}>

            <div className='recipe-form-line'>
              <label htmlFor='recipe-title-input'>item:</label>
              <br />
              <input
                id='recipe-title-input'
                key='title'
                name='title'
                type='text'
                value={title}
                autoComplete="off"
                onChange={this.handleChange}/>
                <br />
                <label htmlFor='recipe-title-input'> section:</label>
                <br />
                <input
                  id='recipe-section-input'
                  key='section'
                  name='section'
                  type='text'
                  //value={section}
                  autoComplete="off"
                  onChange={this.handleChange}/>
            </div>

 
            <button
              type="submit"
              className="buttons"
              style={{alignSelf: 'flex-end', marginRight: 0}}
            >
              add item
            </button>
            <select 
            id="section-pick" 
            name="section-pick"
            onChange={e=> this.updateInput("newSection", e.target.value)}
            >
            <option value="">Produce</option>
            <option value="">Refrigerated</option>
            <option value="">Frozen</option>
            <option value=''>Pharma</option>
            <option value='' checked >Other</option>
            <option value=''>Nonfood</option>
            </select>

          

          </form>
        </div>
      )
    }
  }
  
  

  class GrocList extends Component {

    
    render() {
      console.log("list test:"+this.props.upGrocs)
      const {onDelete} = this.props;
      
      const grocs = this.props.grocs.map((r,index) => (
        <Groc key={r.id} {...r} onDelete={onDelete} />
      
      ));
      
      return (
        <ul>
        {grocs}
         
        </ul>
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