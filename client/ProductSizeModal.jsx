import React from 'react';

function ProductSizeModal(props) {
  let sizes, image, isHidden;
  sizes = !props.sizes
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
  image = props.image;
  isHidden = props.isHidden
    ? "seo-content"
    : "seo-content unhide";

  return (
    <div className={isHidden}>
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