import React from 'react'


const About = () => {
  return (
    <div>
      <div className="container">
        <h3>About this site</h3>
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