

import React, { Component } from 'react'


export default class Recipe extends Component{
    state = {isVisible: false }
 


    toggleVisibility = () => {
        this.setState({
            isVisible: !this.state.isVisible
        })
    }   
  

    render(){

        const isVisible = this.state.isVisible;
        const toggleStyle = {
            display: isVisible ? 'block' : 'none'
        }
        const showHide = isVisible ? "Hide" : "Show" ;

        const {title, id, onDelete} = this.props;
        const ingredients = this.props.ingredients.map((ing,index) => ( 
            <li key={index}>{ing}</li>
        ))
        return(<div className="recipes">
            <div className="recipe-title">
            <h3>{title} <button className="btn btn-info" onClick = { this.toggleVisibility }>{showHide} ingredients</button>
            </h3>
            <button className="delrec btn btn-danger" type="button" onClick={() => onDelete(id)}>delete recipe</button>
            </div>
            <ul style={toggleStyle}>{ingredients}</ul>
           
            <hr />
        </div>)
    }
}


