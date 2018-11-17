import React, {Component} from 'react';
import ReactDOM from 'react-dom';
//import 'bootstrap/dist/css/bootstrap.css'
import './styles/index.css';
//import App from './App';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from "./Navbar"
import RecipeApp from "./recipes/RecipeApp";

import List from "./groceries/GrocApp";
import About from "./About";
import * as serviceWorker from './serviceWorker';

const NotFoundPage = () =>(
    <div className="App">
        <div className="containter intro"> 
            <h1>Welcome to Shopping Buddy. </h1>
            <img src="shop.jpg" alt="Grocery Store" />
            <p>An app for collecting and organizing your favorite recipes
            and pushing them to a sortable shopping list.</p>
        </div>
    </div>
)

class App extends Component {
    render(){
        return(
            <BrowserRouter>
            <div>
             <Navbar />
             <hr />
             <Switch>
                <Route path="/about" component={About}  exact={true}/>
                <Route path="/recipes" component={RecipeApp} />
                <Route path="/groceries" component={List} />
                <Route path="/list" component={List} />
                <Route component={NotFoundPage} />
              </Switch>
              </div>
            </BrowserRouter>
         )
    }
}





ReactDOM.render(<App />, document.querySelector('#root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();




