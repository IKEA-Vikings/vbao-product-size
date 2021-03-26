import React from 'react';
import {mount,shallow,render,configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import ProductSizeButton from '../client/ProductSizeButton.jsx';
import ProductSizeModal from '../client/ProductSizeModal.jsx';

configure({ adapter: new Adapter() });

describe('ProductSizeButton', () => {
  it('renders without crashing', () => {
    const component = shallow(<ProductSizeButton />);
  });

  it('should render correctly', () => {
    const component = shallow(<ProductSizeButton />);
    expect(component).toMatchSnapshot();
  });
});

describe('ProductSizeButton', () => {
  it('renders without crashing', () => {
    const component = shallow(<ProductSizeModal />);
  });

  it('should render correctly', () => {
    const component = shallow(<ProductSizeModal />);
    expect(component).toMatchSnapshot();
  });

  it('should render with a sizes prop', () => {
    const sizes = [
      {
        name: 'Height',
        size: '45',
        unit: 'inch'
      },
      {
        name: 'Width',
        size: '25',
        unit: 'inch'
      }
    ];

    const component = shallow(<ProductSizeModal sizes={sizes}/>);
    expect(component).toMatchSnapshot();
  });

  it('should render with isHidden prop', () => {
    const isHidden = true;
    const component = shallow(<ProductSizeModal isHidden={isHidden}/>);
    expect(component).toMatchSnapshot();
  });
});