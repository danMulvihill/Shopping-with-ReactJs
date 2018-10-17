import React from 'react'


const About = () => {
  return (
    <div>
      <div className="container">
        <h3>About this site</h3>
        <p>This site is still very much a work in progress.
        Please be patient.</p>
        <p>Future plans include:</p>
        <ul>
          <li>A back-end database to store user data so you can switch from one 
          acount to another.</li>
          <li>Some sort of mechanism to retrieve recipes from external sources and APIs</li>
          <li>Interaction between the recipe lists and shopping list</li>
        </ul>
        <p>Right now you can use it to store (locally, on your browser) recipes 
          and shopping items to sort. Take it to the store with you next time you go shopping</p>

          <p>If you would like more information or wish to contribute in any way, or hire me, 
          please contact me through <a href="https://www.linkedin.com/in/dan-mulvihill-4a45654/">Linkedin</a>.
          </p>

          <h3>Technical Details</h3>
        <p>This site was created with ReactJS for a class assignment. React is a javascript 
        framework for creating user interfaces for websites and web apps. It is ideally suited for
        data-heavy sites and for sites requiring manipulation and rearrangemnt of data like blogs, 
        e-commerce sites, and search engines.
        </p>
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

      </div>
    
    </div>
  )
}

export default About;