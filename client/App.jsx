import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ProductSizeButton from './ProductSizeButton.jsx';
import ProductSizeModal from './ProductSizeModal.jsx';
import './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleOverlay = this.toggleOverlay.bind(this);

    this.state = {
      data: [],
      image: "",
      overlay: "overlay",
      id: window.location.href.split('/')[3]
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:3002/api/sizes/${this.state.id}`)
      .then((res) => {
        this.setState({data: res.data});
      })
      .catch((err) => console.error(err));

    //Temporary image endpoint. Service endpoint does not appear to be ready yet.
    axios.get(`http://localhost:3004/images/org/${this.state.id}`)
      .then((res) => {
        this.setState({image: res.data[0]});
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