import React, { Component } from "react";
import './styles/RecipeApp.css'


class List2App extends Component {

  static defaultProps = {
    sections: ["Produce", "Refrigerated", "Frozen", "Pharma", "Other Food", "Other items (not food)"]
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [
          { 
            id: 0,
            ingredient: 'Eggs',
            quantity: 1,
            section: 'Refrigerated'
          },
      ],
      newItem: "",
      newQuantity: 1,
      newSection: ''
    };
  }


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


  addItem() {
    
    // create a new item
    console.log(" newSection?:"+ this.state.newQuantity)
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice(),
      quantity: this.state.newQuantity.slice(),
      section: this.state.newSection.slice()
    };
    console.log(" mount value:"+ this.state.newItem)
    console.log(" mount section:"+ this.state.newSection)
    

    // copy current list of items
    const list = [...this.state.list];
    console.log(this.state.list.length)
    //console.log("list:"+this.state.list[0].section)
    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: "",
      newQuantity: "1",
      newSection: ""
    });

  }

  // handleSubmit(e){
  //   if(this.refs.title.value===""){
  //     alert('missing data')
  //   }else{
  //     this.setState({list:{
  //       id: 1 + Math.random(),
  //       value: this.refs.title.value,
  //       quantity: this.refs.quantity.value,
  //       section: this.refs.section.value
  //     }})
  //   }
  // }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });

  }



  render() {
    let sectionOptions = this.props.sections.map(section =>{
      return <option key={section} value="section">{section} </option> 
    })   
    return (
      <div className="App">
        
        <div className="container">
          <h3>Add Groceries Here</h3>
          <br />
          <form>
            <input
              type = "number" ref="quantity"
              min = "1"
              class = "num-input"
              placeholder = "#"
              value={this.state.newQuantity}
              onChange={function(e){ return this.updateInput("newQuantity", e.target.value)}}
            />
            <input
              type="text" 
              placeholder="enter items here"
              value={this.state.newItem}
              onChange={e => this.updateInput("newItem", e.target.value)}
            />

            <input
            type="text" 
            placeholder="enter section here"
            value={this.state.newSection}
            onChange={e => this.updateInput("newSection", e.target.value)}
            />
            <button
              onClick={() => this.addItem()}
              //disabled={!this.state.newItem.length}
            >
              &#43; Add
            </button>
            <br />
            {console.log(this.state.list.length)}
            {this.state.list.length} items on list
            <br />

            <select >
            onChange={e => this.updateInput("newSection", e.target.value)}
              {sectionOptions}
            </select>
          
            
          </form>
          <br /> <br />
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id} className="list-item">
                <div className="list-item__container">
                  <div> 
                   <span className="quantity-diplay">{item.quantity} </span>  
                     | {item.value}
                  </div> 
                  <div>   
                    <span className="section-dislay">{item.section}</span>
                    <button 
                      className = "button x-button"   
                      onClick={() => this.deleteItem(item.id)}>
                      X
                    </button>
                  </div>
                </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default List2App;


/*

          <div class="checkbox-area">
            <label class="container-radio">Produce
                <input type="radio" id ="add" name="foodtype"
                value={this.state.newItem} 
                 />
            <span class="checkmark-radio"></span>
            </label>
            <label class="container-radio">Refrigerated
            <input type="radio" id ="add" name ="Refrigerated" 
                value={this.state.newItem} />
            <span class="checkmark-radio"></span>
            </label>
            <label class="container-radio">Frozen
            <input type="radio"id="add" name="Frozen" 
                value={this.state.newItem} />
            <span class="checkmark-radio"></span>
            </label>
            <label class="container-radio">Pharmaceuticals
            <input type="radio"id="add" name="Pharma" 
                value={this.state.newItem} />
            <span class="checkmark-radio"></span>
            </label>
            <label class="container-radio">Other Food (food at room temp)
            <input type="radio" id ="add" name="foodtype" 
                value={this.state.newItem} />
            <span class="checkmark-radio"></span>
            </label>
            <label class="container-radio">Other items (not food)
             <input type="radio" id ="add" name="foodtype" 
                value={this.state.newItem} />
                <span class="checkmark-radio"></span>
            </label>
            onChange={e => this.updateInput("newItem", e.target.value)}
          </div>



*/


/*
          <select 
          id="section-pick" 
          name="section-pick"
          onChange={e=> this.updateInput("newSection", e.target.value)}
          >
          <option value={this.state.newSection}>Produce</option>
          <option value={this.state.newSection}>Refrigerated</option>
          <option value={this.state.newSection}>Frozen</option>
          <option value={this.state.newSection}>Pharma</option>
          <option value={this.state.newSection} checked >Other</option>
          <option value={this.state.newSection}>Nonfood</option>
          </select>



*/





// class App extends React.Component {
  
//     constructor(props) {
//       super(props);
  
//       this.state = {
//         recipes: [],
//         nextRecipeId: 3     
//       }
//     }
    
  
//   componentWillMount(){
//     this.setState({recipes: [
//       {
//         id: 0,
//         title: "Spaghetti",
//         ingredients: [ "pasta", "tomato sauce"]
//       },
//       {
//         id: 1,
//         title: "PB&J Sandwiches",
//         ingredients: ["Bread", "Peanut Butter", "Jelly"]
//       },{
//         id: 2,
//         title: "Chocolate-chip Cookies",
//         ingredients: ["Sugar", "Butter", "Eggs", "Flour"]
//       }
//     ]})
//   }
  
  
//   //LocalStorage:
//   componentDidMount() {
//     // for all items in state
//     for (let key in this.state) {
//         // if the key exists in localStorage
//         if (localStorage.hasOwnProperty(key)) {
//           // get the key's value from localStorage
//           let value = localStorage.getItem(key);
  
//           // parse the localStorage string and setState
//           try {
//             value = JSON.parse(value);
//             this.setState({ [key]: value });
//           } catch (e) {
//             // handle empty string
//             this.setState({ [key]: value });
//           }
//         }
//       }
  
//     // add event listener to save state to localStorage
//     // when user leaves/refreshes the page
//     window.addEventListener(
//       "beforeunload",
//       this.saveStateToLocalStorage.bind(this)
//     );
//   }
  
//   componentWillUnmount() {
//     window.removeEventListener(
//       "beforeunload",
//       this.saveStateToLocalStorage.bind(this)
//     );
  
//     // saves if component has a chance to unmount
//     this.saveStateToLocalStorage();
//   }
  
  
//   saveStateToLocalStorage() {
//     // for every item in React state
//     for (let key in this.state) {
//       // save to localStorage
//       localStorage.setItem(key, JSON.stringify(this.state[key]));
//     }
//   }
  
//   updateInput(key, value) {
//     // update react state
//     this.setState({ [key]: value });
  
//   }
  
  
    
//     render() {
//       return (
//         <div id="app">
       
//         <div id="recipes"><RecipeApp upRecipes="this.state.recipes" /></div>
//         <div id="grocs"><List2App /></div>
          
          
//         </div>
//       )
//     }
//   }
  
//   export default App
  
  
  

