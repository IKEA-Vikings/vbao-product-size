import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ProductServicesButton from './ProductSizeButton.jsx';
import ProductServicesModal from './ProductSizeModal.jsx';

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

    axios.get('api/images/type/size/1')
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
        <ProductServicesModal
          sizes={this.state.data.sizes} 
          image={this.state.image} 
          isHidden={this.state.overlay === "overlay"}/>
        <div
          className={this.state.overlay}
          onClick={this.toggleOverlay}></div>
        <ProductServicesButton
          handleClick={this.toggleOverlay} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('product-size'));