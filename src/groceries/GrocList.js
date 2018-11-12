import React, { Component } from 'react'
import Groc from "./GrocListItem"


  export default class GrocList extends Component {

    
    render() {
      //console.log(this.props.filterChoice)
      const {onDelete} = this.props;
      
      const grocs = this.props.grocs.map((groc,index) => (
        <Groc key={groc.id} {...groc} onDelete={onDelete} filterChoice = {this.props.filterChoice} />
      
      ));
      
      return (<div>
        { this.props.grocs.length === 0 && <h2 className="card">Your grocery list is currently empty.
          <br /> Use the form on the left to add some items.</h2>}
        <ul>
        {grocs}
         
        </ul>
        </div>)
    
    }
  }
  



