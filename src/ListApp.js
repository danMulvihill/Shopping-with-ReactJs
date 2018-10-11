import React, { Component } from 'react';
import './RecipeApp.css'

class ListApp extends Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.state = {
      items: [
        {
          id: 0,
          ingredient: "Cheese",
          section: "Refrigerated"
        }
      ],
      nextItemId: 2
    };
  }

  onAdd(item) {
    this.setState((prevState) => {
      const  newItem = {...item, id: this.state.nextItemId}
      return{
        nextItemId: prevState.nextItemId +1,
        items: [...this.state.items, newItem],
      }
    });

    // if (!item) {
    //   return 'Type an item and hit Enter';
    // } else if (this.state.items.indexOf(item) > -1) {
    //   return 'This item is already on the list';
    // }

  }


  onRemove(itemToRemove) {
    // this.setState((prevState) => ({
    //   items: prevState.items.filter((item) => itemToRemove !== item)
    // }));

    // const items = this.state.items.filter(r => r.id !== id);
    // this.setState({items});
  }

  render() {
    const subtitle = 'Add to List';

    return (<div>
      
      <div className="container">
        
        <AddItem onAdd={this.onAdd} />
        <Items onRemove={this.onRemove}
          items={this.state.items}    
        />

      </div>
      </div>);
  }

  //Storaging and retrieving list from LocalStorage: 
  componentDidMount() {
    try {
      const json = localStorage.getItem('items');
      const items = JSON.parse(json);

      if (items) {
        this.setState(() => ({ items }));
      }
    } catch (e) {
     
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.items.length !== this.state.items.length) {
      const json = JSON.stringify(this.state.items);
      localStorage.setItem('items', json);
    }
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }


}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
};

Header.defaultProps = {
  title: 'List Maker'
};


const Items = (props) => {
  return (
    <div>
      {props.items.length === 0 && <p>Please add an item to get started!</p>}
      {
        props.items.map((item) => (
          <Item
            key={item}
            optionText={item}
            onRemove={props.onRemove}
          />
        ))
      }
    </div>
  );
};

const Item = (props) => {
  return (
    <div className="list-item">
     <div className="list-item__container">
      {props.optionText}
      <button className="button x-button"
        onClick={(e) => {
          props.onRemove(props.optionText);
        }}
      >
        X
      </button>
      </div>
    </div>
  );
};

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
    this.state = {
      error: undefined
    };
  }
  onAdd(e) {
    e.preventDefault();

    const listItem = e.target.elements.listItem.value.trim();
    const error = this.props.onAdd(listItem);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.listItem.value = '';
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onAdd}>
          <input type="text" name="listItem" />
          <button>Add Item</button>
        </form>
      </div>
    );
  }
}

export default ListApp;
