import React from 'react';

function ProductSizeModal(props) {
  let sizes, image, isHidden;
  sizes = [];
  image = "";
  isHidden = props.isHidden;

  return (
    <div className="seo-content">
      <div className="product-dimensions">
        <h2 className="product-dimensions__title">
          Product Size
        </h2>
        <div className="product-dimensions-content__image">
          <div className="product-dimensions__image-container">
            <span className="aspect-ratio-image aspect-ratio-image__square">
              {image}
            </span>
          </div>
        </div>
        <dl className="product-dimensions__list">
          {sizes}
        </dl>
      </div>
    </div>
  );
}

export default ProductSizeModal;