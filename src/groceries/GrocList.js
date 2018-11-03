import React, { Component } from 'react'
import Groc from "./GrocListItem"


  export default class GrocList extends Component {

    
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
  



