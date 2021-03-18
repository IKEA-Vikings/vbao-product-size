import React from 'react';

const ProductSizeModal = (props) => {
  const sizes = !props.sizes
    ? []
    : props.sizes.map((size) => {
      return (
        <div className="product-dimensions__list-container" key={size.name + size.size + size.unit}>
          <dt className="product-dimensions__list-item-name">
            {size.name}:
          </dt>
          <dd className="product-dimensions__list-item-measure">
            {size.size} {size.unit}
          </dd>
        </div>
      );
    });
  const image = props.image;
  const isHidden = props.isHidden
    ? "seo-content"
    : "seo-content unhide";

  return (
    <div className={isHidden}>
      <div className="seo-content__modal-header">
        <button
          className="close"
          onClick={props.toggleOverlay} >
          <svg className="svg-icon close" focusable="false" viewBox="0 0 100 100" >
            <path d="M20 20 L80 80 Z" stroke="black" strokeWidth="10" fill="none" />
            <path d="M20 80 L80 20 Z" stroke="black" strokeWidth="10" fill="none" />
          </svg>
        </button>
      </div>
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