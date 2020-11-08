import React, { Component } from 'react';
import {Link,Route} from 'react-router-dom'
import Parcel from './router/Parcel.jsx'
import Home from './router/Home.jsx'
import Today from './router/Today.jsx'
import List from './router/List.jsx'
import Set from './router/Set.jsx'
import './css/reset.css'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div className="App">
        <Parcel>
          <Route path="/" exact component={Home} />
          <Route path="/today" component={Today}/>
          <Route path="/list" component={List}/>
          <Route path="/set" component={Set}/>
        </Parcel>
      </div>
    );
  }
}
 
export default App;