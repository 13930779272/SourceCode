import React, { Component } from 'react';
import {Link,Route} from 'react-router-dom'
import '../css/Footer.css'
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <ul className="footer">
        <li>
          <Link to="/">
            <span>主页</span>
          </Link>
        </li>
        <li>
          <Link to="/today">
            <span>今日</span>
          </Link>
        </li>
        <li>
          <Link to="/list">
            <span>排行</span>
          </Link>
        </li>
        <li>
          <Link to="/set">
            <span>设置</span>
          </Link>
        </li>
      </ul>
    );
  }
}
 
export default Footer;