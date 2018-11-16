import React, { Component } from 'react'
//import { createStore } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import GrocList from './GrocList.js'
import GrocInput from './GrocInput'
//import uuid from 'uuid';

import uniqueId  from 'lodash';

//const store = createStore((state={count:0}) =>{ return state; });
//have not yet fully implimented Redux. Still trying to figure it out.
//console.log(store.getState());

class ListApp extends Component {
    constructor(props) {
      super(props);
      //this.onSave = this.onSave.bind(this);
      //this.onDelete = this.onDelete.bind(this);
      this.state = {
        grocs: [],
        nextGrocId: uniqueId(),
        sections: [
          { value: 'All'},
          { value: 'Produce' },
          { value: 'Frozen' },
          { value: 'Refrigerated' },
          { value: 'Center Isle Food'},
          { value: 'Other Food'},
          { value: 'Front of store'},
          { value: 'Household'},
          { value: 'Drugs'},
          { value: 'Bath/Hygiene'},
          { value: 'Other/Not Food'}
  
        ],
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
        filterChoice: "All"
      }
    });
  }

  onAtoZ = () => {
    console.log(this.state.grocs)
  }

  
  onDelete = (id) => {
    const grocs = this.state.grocs.filter(groc => groc.id !== id);
    this.setState({grocs});
  }


  handleChangeFilt = (e) => {
    //console.log(e.target.value)
    //this.props.onChange(e.target.value);
  }

  changeSection = (newSection) => {
    this.setState({
      filterChoice: newSection
    });

  }
  
  render() {
    const optionMenu = this.state.sections.map((optionItem)=>{
      return <option value={optionItem.value}>{optionItem.value}</option>
    })
    return ( 
      <div className="grocApp container-fluid">
          <div className="row justify-content-between">
              <div className="col-sm-4">
                  <h3>List groceries here:</h3>
                  <GrocInput 
                    onSave={this.onSave} 
                    changeSection={this.changeSection} 
                    sections={this.state.sections}
                    /> 
                  <div style={{background: "gray", color: "white", textAlign: "center", padding: "5px"}}>{this.state.grocs.length} items on list</div>
              </div>
              <div className="col-sm-8">
                <h3 style={{margin: "15px"}}>Filter by: <select id="filtered-sections" 
                  onChange={e=>this.changeSection(e.target.value)}>
                    {optionMenu}

                  </select>
                  <button onClick={this.onAtoZ} >A - Z </button>
                </h3>
                  <GrocList onDelete={this.onDelete} 
                    grocs={this.state.grocs} 
                    filterChoice={this.state.filterChoice} />
                </div>
            </div>
      </div>
    );
  }

  }
  
  export default ListApp;


