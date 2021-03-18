import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ProductSizeButton from './ProductSizeButton.jsx';
import ProductSizeModal from './ProductSizeModal.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleOverlay = this.toggleOverlay.bind(this);

    this.state = {
      data: [],
      image: "",
      overlay: "overlay"
    }
  }

  componentDidMount() {
    axios.get('/api/sizes/1')
      .then((res) => {
        console.log(res.data);
        this.setState({data: res.data});
      })
      .catch((err) => console.error(err));

    axios.get('http://localhost:3004/api/images/type/size/1')
    .then((res) => {
      this.setState({image: res.data.sizeService});
    })
    .catch((err) => console.error(err));
  }

  toggleOverlay(e) {
    e.preventDefault();
    if (this.state.overlay === "overlay") {
      this.setState({overlay: "overlay unhide"});
    } else {
      this.setState({overlay: "overlay"});
    }
  }

  render() {
    return (
      <div className="product-info-section__button">
        <ProductSizeModal
          sizes={this.state.data.sizes} 
          image={this.state.image} 
          toggleOverlay={this.toggleOverlay}
          isHidden={this.state.overlay === "overlay"} />
        <div
          className={this.state.overlay}
          onClick={this.toggleOverlay}></div>
        <ProductSizeButton
          handleClick={this.toggleOverlay} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('product-size'));