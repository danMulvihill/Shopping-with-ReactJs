
import React, { Component } from 'react'
import Select from 'react-select';


export default class GrocInput extends Component {
    static defaultProps = {
      onClose() {},
      onSave() {}
    }
    
    state = {
      item: ""
    };
    
    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value});
    }

    handleChangeSec = (selectedOption) => {
        //this.setState({[e.target.name]: e.target.value});
        this.setState({selectedOption: selectedOption.label});
        console.log(`Option picked: `, selectedOption.value)
        
      }

    getOptions =() => {
      return this.props.sections
    }
    
    handleSubmit = (e) => {
      e.preventDefault();
      
      this.props.onSave({...this.state});
      this.setState({
        item: '',
        quantity: 1,
        section: ''
      })
      this.props.changeSection("All")
    }


    render() {
      const {item, quantity} = this.state;
      return (
        <div className="recipe-form-container">
          <form className='recipe-form' onSubmit={this.handleSubmit}>

            <div className='recipe-form-line'>
              <label htmlFor='recipe-item-input'>item:</label>
              <br />
              <input
                id='recipe-item-input'
                key='item'
                name='item'
                type='text'
                value={item}
                autoComplete="on"
                onChange={this.handleChange}
                required
                />
                <label htmlFor='recipe-quantity-input'>quantity:</label>
                <br />
                <input
                  id='recipe-quantity-input'
                  key='quantity'
                  name='quantity'
                  type='number'
                  min="1"
                  value={quantity || 1}
                  autoComplete="off"
                  onChange={this.handleChange}
                  required
                  />
              </div>
              <div className='recipe-form-line'>
                <label htmlFor='recipe-item-input'> section:</label>
                
                <Select 
                  id='recipe-section-input'
                  key='section'
                  name='section'
                  autoComplete="on"
                  //value={selectedOption}
                  onChange={this.handleChangeSec}
                  options={ this.getOptions() }
                />
            </div>


            <button
              type="submit"
              className="buttons btn btn-primary btn-block"
              style={{alignSelf: 'flex-end', marginRight: 0}}
            >
              add item
            </button>
            


          </form>
        </div>
      )
    }
  }
  
  