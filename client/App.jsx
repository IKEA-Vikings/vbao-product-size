import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (<h1>HELLO</h1>);
  }
}

ReactDOM.render(<App />, document.getElementById('product-size'));