
import React, { Component } from 'react'
import Select from 'react-select';


export default class GrocInput extends Component {
    static defaultProps = {
      onClose() {},
      onSave() {}
    }
    
    state = {
      title: ""
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
        title: '',
        quantity: 1,
        section: ''
      })
      this.props.changeSection("All")
    }


    render() {
      const {title, quantity, selectedOption} = this.state;
      console.log("PROPS: "+this.props.sections)
      return (
        <div className="recipe-form-container">
          <form className='recipe-form' onSubmit={this.handleSubmit}>

            <div className='recipe-form-line'>
              <label htmlFor='recipe-title-input'>item:</label>
              <br />
              <input
                id='recipe-title-input'
                key='title'
                name='title'
                type='text'
                value={title}
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
                <label htmlFor='recipe-title-input'> section:</label>
                
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
              className="buttons"
              style={{alignSelf: 'flex-end', marginRight: 0}}
            >
              add item
            </button>
            


          </form>
        </div>
      )
    }
  }
  
  