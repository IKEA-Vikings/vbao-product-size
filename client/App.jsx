import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    axios.get('/api/sizes/1')
      .then((res) => {
        this.setState(res.data);
      });
  }

  render() {
    return (<h1>HELLO</h1>);
  }
}

ReactDOM.render(<App />, document.getElementById('product-size'));