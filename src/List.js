import React, { Component } from 'react'
import { createStore } from 'redux';
import Select from 'react-select';


const store = createStore((state={count:0}) =>{ return state; });
//have not yet fully implimented Redux. Still trying to figure it out.

//this file has more than one component. need to refactor into separate files.


console.log(store.getState());

class ListApp extends Component {
    constructor(props) {
      super(props);
      //this.onSave = this.onSave.bind(this);
      //this.onDelete = this.onDelete.bind(this);
      this.state = {
        grocs: [
          {
            id: 0,
            title: "Eggs",
            section: "Refrigerated"
          },
          {
            id: 1,
            title: "Bananas",
            section: "Produce"
          }
        ],
        nextGrocId: 2     
      }
    }
    
 //LocalStorage:
  componentDidMount() {
    // for all items in state
    for (let key in this.state) {
        // if the key exists in localStorage
        if (localStorage.hasOwnProperty(key)) {
          // get the key's value from localStorage
          let value = localStorage.getItem(key);
  
          // parse the localStorage string and setState
          try {
            value = JSON.parse(value);
            this.setState({ [key]: value });
          } catch (e) {
            // handle empty string
            this.setState({ [key]: value });
          }
        }
      }

    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }


  saveStateToLocalStorage() {
    // for every item in React state
    for (let key in this.state) {
      // save to localStorage
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  }

  updateInput(key, value) {
    // update react state
    this.setState({ [key]: value });

  }




    onSave = (grocs) => {
      this.setState((prevState) => {
        const newGroc = {...grocs, id: this.state.nextGrocId};
        return {
          nextGrocId: prevState.nextGrocId + 1,
          grocs: [...this.state.grocs, newGroc],
         
        }
      });
    }
    
    onDelete = (id) => {
      const grocs = this.state.grocs.filter(r => r.id !== id);
      this.setState({grocs});
    }
    
    render() {
      // console.log(this.props.upGrocs.length)
      return (
        
        <div className="App">

         <div className="container">
          
          
          <h3>List groceries here:</h3>
          <GrocInput onSave={this.onSave} /> 
          <GrocList onDelete={this.onDelete} 
              grocs={this.state.grocs} />
          
        </div></div>
      );
    }

  }
  
  export default ListApp;






class GrocInput extends Component {
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
        { value: 'produce', label: 'Produce' },
        { value: 'frozen', label: 'Frozen' },
        { value: 'refrigerated', label: 'Refrigerated' },
        { value: 'otherFood', label: "Other Food"},
        { value: 'drugs', label: "Drugs"},
        { value: 'notFood', label: "Other/Not Food"}

      ]
    }
    
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.onSave({...this.state});
      this.setState({
        title: '',
        section: ''
      })
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
                onChange={this.handleChange}/>
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

            <br />
            Filter by: 
            <select 
            id="section-pick" 
            name="section-pick"
            //onChange={e=> this.updateInput("newSection", e.target.value)}
            >
            <option value="">Produce</option>
            <option value="">Refrigerated</option>
            <option value="">Frozen</option>
            <option value=''>Pharma</option>
            <option value='' checked >Other</option>
            <option value=''>Nonfood</option>
            </select>

          

          </form>
        </div>
      )
    }
  }
  
  

  class GrocList extends Component {

    
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
  
  class Groc extends Component{
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


