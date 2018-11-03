import React, { Component } from 'react'
import Groc from "./GrocListItem"


  export default class GrocList extends Component {

    
    render() {
      //console.log(this.props.filterChoice)
      const {onDelete} = this.props;
      
      const grocs = this.props.grocs.map((groc,index) => (
        <Groc key={groc.id} {...groc} onDelete={onDelete} filterChoice = {this.props.filterChoice} />
      
      ));
      
      return (
        <ul>
        {grocs}
         
        </ul>
      )
    
    }
  }
  



