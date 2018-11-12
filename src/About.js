import React from 'react'


const About = () => {
  return (
    <div>
      <div className="container">
       
        <p>This site is still very much a work in progress.
        Please be patient.</p>
        <p>Future plans include:</p>
        <ul>
          <li>A back-end database to store user data so you can switch from one 
          device to another.</li>
          <li>Some sort of mechanism to retrieve recipes from external sources and APIs</li>
          <li>Interaction between the recipe lists and shopping list</li>
        </ul>
        <p>Right now you can use it to store (locally, on your browser) recipes 
          and shopping items, and the shopping items can be sorted into store sections. 
          Take it to the store with you the next time you go shopping!</p>

          <h3>Technical Details</h3>
        <p>This site was created with ReactJS for a class assignment. React is a javascript 
        framework for creating user interfaces for websites and web apps. It is ideally suited for
        data-heavy sites and for sites requiring manipulation and rearrangemnt of data like blogs, 
        e-commerce sites, and search engines.
        </p>
        <p>I just starting learning React, so it's going to take some time.
        There is a <a href="http://www.embraceyourinnerengineer.org/shopping/">vanilla JavaScript version of the list sorter available here</a> if you can't wait, or are just curious.</p>

        <p>React works best with ECMAScript 6 (ES6) syntax and advanced (but not too difficult) concepts like 
        array methods. Before trying to take on React, I would recommend getting comfortable with these concepts.
         Here is a summary of the some the most widely used concepts React uses:</p>
         <ul>
          <li>"this" binding</li>
          <li>array methods (especially map)</li>
          <li>ES6:</li>
          <ul>
            <li>import/export</li>
            <li>destructuring  x,y,z = React </li>
            <li>spread operator ['x', ...y]</li>
          </ul> 
        </ul>
        <p>If you would like more information or wish to contribute in any way, or hire me, 
        please contact me through <a href="https://www.linkedin.com/in/dan-mulvihill-4a45654/">Linkedin</a>.
        <br />
        <br />

        <h2 style={{fontWeight: "bold", margin: 20}}>Brief guide to imperial measuring units</h2>
        <p>Measuring by Volume</p>
        <table class="table table-condensed">
          <tr>
            <td>Gallon</td><td>4 quarts</td><td> 3.8 litters</td>
          </tr>
          <tr>
            <td>Quart</td><td>4 cups</td><td>a little under 1 litter</td>
          </tr>
          <tr>
            <td>Cup</td><td>16 tablespoons or 8 fl. oz.</td><td>237 milliliters</td>
          </tr>
          <tr>
            <td>Tablespoon</td><td>3 teaspoons</td><td>15 milliliters</td>
          </tr>
          <tr>
            <td>Teaspoon</td><td></td><td>5 milliliters</td>
          </tr>
        
        </table>
        <p>Measuring by Weight</p>
        <table class="table table-condensed">
          <tr>
            <td>Pound</td><td>16 Ounces</td><td> 453.592 grams</td>
          </tr>
          <tr>
            <td>Ounce</td><td></td><td>28.3495 grams</td>
          </tr>
        
        </table>
        </p>
      </div>
    
    </div>
  )
}

export default About;