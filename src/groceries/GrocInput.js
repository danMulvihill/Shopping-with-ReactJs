
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
      return [
        { value: 'Produce', label: 'Produce' },
        { value: 'Frozen', label: 'Frozen' },
        { value: 'Refrigerated', label: 'Refrigerated' },
        { value: 'CenterIsle', label: 'Center Isle Food'},
        { value: 'OtherFood', label: "Other Food"},
        { value: 'Household', label: "Household items"},
        { value: 'Drugs', label: "Drugs"},
        { value: 'NotFood', label: "Other/Not Food"}

      ]
    }
    
    handleSubmit = (e) => {
      e.preventDefault();
      
      this.props.onSave({...this.state});
      this.setState({
        title: '',
        section: ''
      })
      this.props.changeSection("All")
    }


    render() {
      const {title, selectedOption} = this.state;

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
  
  