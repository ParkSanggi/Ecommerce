import React from 'react';
import './App.css';
import Home from './component/home/home';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    )
  }
}

export default App;
