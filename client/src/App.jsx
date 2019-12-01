import React, { Component } from 'react';
import autobind from 'react-autobind';
import {
  Iframe,
} from './components';
import Links from './LinksBar/Links';
import data from './data.json';

class App extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      // data: 'INITAL',
      src: '',
    };
  }

  render() {
    const {
      src,
    } = this.state;
    return (
      <div className="App">
        <Links
          links={data}
          onClick={_src => this.setState({
            src: _src,
          })}
        />
        <Iframe src={src} />
      </div>
    );
  }
}

export default App;
