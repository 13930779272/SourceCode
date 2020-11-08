import React, { Component } from 'react';
import {Link,Route} from 'react-router-dom'
import Head from '../components/Head.jsx'
import Footer from '../components/Footer.jsx'
import '../css/Parcel.css'
class Parcel extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div className="parcel">
        <Head/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}
 
export default Parcel;