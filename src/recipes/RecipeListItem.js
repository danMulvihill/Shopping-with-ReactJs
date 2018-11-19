

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

        const {title, id, details, onDelete} = this.props;
        const ingredients = this.props.ingredients.map((ing,index) => ( 
            <li key={index}>{ing}</li>
        ))
        return(<div className="recipes">
            <div className="recipe-title">
                <h3>{title} </h3>
                <div>
                    <button className="btn btn-info" onClick = { this.toggleVisibility }>{showHide} ingredients</button>
                    <button className="delrec btn btn-danger" type="button" onClick={() => onDelete(id)}>X</button>
                </div>
            </div>
            <div  style={toggleStyle}>
                    <p style={{fontSize: "0.8em"}}>{details}</p>
                <ul>{ingredients}</ul>
            </div>
            
           
            <hr />
        </div>)
    }
}


