

import React, { Component } from 'react'


export default class Recipe extends Component{
    render(){
        const {title, id, onDelete} = this.props;
        const ingredients = this.props.ingredients.map((ing,index) => ( 
            <li key={index}>{ing}</li>
        ))
        return(<div>
          <button className="delrec btn btn-danger" type="button" onClick={() => onDelete(id)}>delete recipe</button>
            <h3>{title}</h3>
            <ul>{ingredients}</ul>
           
            <hr />
        </div>)
    }
}

