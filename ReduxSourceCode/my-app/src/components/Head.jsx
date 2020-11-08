import React, { Component } from 'react';
import '../css/Head.css'
class Head extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div className="head">
        {/* <h1>Head</h1> */}
        <h3>早早</h3>
      </div>
    );
  }
}
 
export default Head;