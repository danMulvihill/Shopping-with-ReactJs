import React, { Component } from 'react'
import { createStore } from 'redux';

import GrocList from './GrocList.js'
import GrocInput from './GrocInput'


const store = createStore((state={count:0}) =>{ return state; });
//have not yet fully implimented Redux. Still trying to figure it out.

//this file has more than one component. need to refactor into separate files.


console.log(store.getState());

class ListApp extends Component {
    constructor(props) {
      super(props);
      //this.onSave = this.onSave.bind(this);
      //this.onDelete = this.onDelete.bind(this);
      this.state = {
        grocs: [
          {
            id: 0,
            title: "Eggs",
            section: "Refrigerated"
          },
          {
            id: 1,
            title: "Bananas",
            section: "Produce"
          }
        ],
        nextGrocId: 2,
        filterChoice: 'All'     
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


    onSave = (grocs) => {
      this.setState((prevState) => {
        const newGroc = {...grocs, id: this.state.nextGrocId};
        return {
          nextGrocId: prevState.nextGrocId + 1,
          grocs: [...this.state.grocs, newGroc],
         
        }
      });
    }
    
    onDelete = (id) => {
      const grocs = this.state.grocs.filter(groc => groc.id !== id);
      this.setState({grocs});
    }


    handleChangeFilt = (e) => {
      console.log(e.target.value)
      //this.props.onChange(e.target.value);
    }

    changeSection = (newSection) => {
      console.log("New Section: "+newSection)
      this.setState({
        filterChoice: newSection
      });
      console.log("Filter Choice: "+this.state.filterChoice)
      // const grocs = this.state.grocs.filter(groc => groc.selectedOption === newSection);
      //   this.setState({grocs});
      
    }
    
    
    render() {
      // console.log(this.props.upGrocs.length)
      return (
        
        <div className="App">

         <div className="container">
          
          
          <h3>List groceries here:</h3>
          <GrocInput onSave={this.onSave} /> 
          
          Filter by: 

          <select id="filtered-sections" 
          onChange={e=>this.changeSection(e.target.value)}>
          <option value="All">All</option>
          <option value="Produce">Produce</option>
          <option value="Refrigerated">Refrigerated</option>
          <option value="Frozen">Frozen</option>
          <option value="Other Food">Other Food</option>
          <option value="Drugs">Drugs</option>
          <option value="Other/Not Food">Other/Not Food</option>
        </select>
    
          
          <GrocList onDelete={this.onDelete} 
              grocs={this.state.grocs} filterChoice={this.state.filterChoice} />
          
        </div></div>
      );
    }

  }
  
  export default ListApp;


