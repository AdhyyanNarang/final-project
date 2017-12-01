import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {masterContract} from './EthereumSetup';


class App extends Component {
  constructor(props) {
   super(props)
   this.state = {
     greeting: ""
   }
  }
  componentWillMount() {
  masterContract.init("pub",true, {from: '0xd394a33299335fa81034dce6b7889ddf637af0af'})
  var data = masterContract.guestPull("pub", {from: '0xd394a33299335fa81034dce6b7889ddf637af0af'})
  this.setState({
     greeting: String(data)
   })
  }
render() {
   return (
     <div className="App">
       <div className="App-header">
         <img src={logo} className="App-logo" alt="logo" />
         <h2>I am Greeter</h2>
       </div>
       <h2>"{this.state.greeting}"</h2>
     </div>
   );
 }
}
export default App;
