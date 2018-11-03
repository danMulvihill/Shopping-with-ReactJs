import React, { Component } from 'react';

export default class Groc extends Component{
    render(){
        const {title, id, section, selectedOption, onDelete} = this.props;
        // const {value} = this.props.selectedOption;
        console.log(this.props.selectedOption)
        return(<li key={id} className="list-item">
            <div className="list-item">
            <div className="list-item__container">
              <div>
                {title}
              </div>
              <div>
                <span className="section-display">{section||selectedOption}</span>
                <button type="button"
                className = "button x-button" 
                onClick={() => onDelete(id)}>          
                X
                </button>
               </div>
            </div>
        </div></li>)
    }
}

