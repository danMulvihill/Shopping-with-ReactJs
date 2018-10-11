import React, { Component } from "react";
import './RecipeApp.css'



class List2App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
          { 
            id: 0,
            ingredient: 'Eggs',
            section: 'Refrigerated'
          },
      ],
      newItem: ""
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
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    // copy current list of items
    const list = [...this.state.list];

    // add the new item to the list
    list.push(newItem);

    // update state with new list, reset the new item input
    this.setState({
      list,
      newItem: ""
    });

  }

  deleteItem(id) {
    // copy current list of items
    const list = [...this.state.list];
    // filter out the item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });

  }


  render() {
    return (
      <div className="App">
       
          <hr />
        
        <div className="container">
          <h3>Add Groceries Here</h3>
          <br />
          <input
            type="text"
            placeholder="ingredient goes here"
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />

          <select id="section-pick" name="section-pick"
          onChange={e=> this.updateInput("newSection", e.target.value)}
          >
            <option value={this.state.newSection}>Produce</option>
            <option value={this.state.newSection}>Refrigerated</option>
            <option value={this.state.newSection}>Frozen</option>
            <option value={this.state.newSection}>Pharma</option>
            <option value={this.state.newSection} checked >Other</option>
            <option value={this.state.newSection}>Nonfood</option>
          </select>
          <button
            onClick={() => this.addItem()}
            //disabled={!this.state.newItem.length}
          >
            &#43; Add
          </button>
          <br /> <br />
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id} className="list-item">
                <div className="list-item__container">
                   {item.value}
                  <button 
                    className = "button x-button"   
                    onClick={() => this.deleteItem(item.id)}>
                    X
                  </button>
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