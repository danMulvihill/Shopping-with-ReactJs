import React from 'react';
import ReactDOM from 'react-dom';
//import 'bootstrap/dist/css/bootstrap.css'
import './styles/index.css';
//import App from './App';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Navbar from "./Navbar"
import RecipeApp from "./RecipeApp";
import List2App from "./List2";
import List from "./List";
import About from "./About";
import * as serviceWorker from './serviceWorker';

const NotFoundPage = () =>(
    <div className="App">
        <div className="containter intro"> 
            <h1>Welcome to Shopping Buddy. </h1>
            <img src="shop.jpg" />
            <p>An app for collecting and organizing your favorite recipes
            and pushing them to a sortable shopping list.</p>
        </div>
    </div>
)


const routes = (
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



ReactDOM.render(routes, document.querySelector('#root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();





// class App extends React.Component {
  
//     constructor(props) {
//       super(props);
  
//       this.state = {
//         recipes: [],
//         nextRecipeId: 3     
//       }
//     }
    
  
//   componentWillMount(){
//     this.setState({recipes: [
//       {
//         id: 0,
//         title: "Spaghetti",
//         ingredients: [ "pasta", "tomato sauce"]
//       },
//       {
//         id: 1,
//         title: "PB&J Sandwiches",
//         ingredients: ["Bread", "Peanut Butter", "Jelly"]
//       },{
//         id: 2,
//         title: "Chocolate-chip Cookies",
//         ingredients: ["Sugar", "Butter", "Eggs", "Flour"]
//       }
//     ]})
//   }
  
  
//   //LocalStorage:
//   componentDidMount() {
//     // for all items in state
//     for (let key in this.state) {
//         // if the key exists in localStorage
//         if (localStorage.hasOwnProperty(key)) {
//           // get the key's value from localStorage
//           let value = localStorage.getItem(key);
  
//           // parse the localStorage string and setState
//           try {
//             value = JSON.parse(value);
//             this.setState({ [key]: value });
//           } catch (e) {
//             // handle empty string
//             this.setState({ [key]: value });
//           }
//         }
//       }
  
//     // add event listener to save state to localStorage
//     // when user leaves/refreshes the page
//     window.addEventListener(
//       "beforeunload",
//       this.saveStateToLocalStorage.bind(this)
//     );
//   }
  
//   componentWillUnmount() {
//     window.removeEventListener(
//       "beforeunload",
//       this.saveStateToLocalStorage.bind(this)
//     );
  
//     // saves if component has a chance to unmount
//     this.saveStateToLocalStorage();
//   }
  
  
//   saveStateToLocalStorage() {
//     // for every item in React state
//     for (let key in this.state) {
//       // save to localStorage
//       localStorage.setItem(key, JSON.stringify(this.state[key]));
//     }
//   }
  
//   updateInput(key, value) {
//     // update react state
//     this.setState({ [key]: value });
  
//   }
  
  
    
//     render() {
//       return (
//         <div id="app">
       
//         <div id="recipes"><RecipeApp upRecipes="this.state.recipes" /></div>
//         <div id="grocs"><List2App /></div>
          
          
//         </div>
//       )
//     }
//   }
  
//   export default App
  
  
  


