import React from 'react';
import axios from 'axios';
import {mount,shallow,render,configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import ProductSize from '../client/ProductSize.jsx';
import ProductSizeButton from '../client/ProductSizeButton.jsx';
import ProductSizeModal from '../client/ProductSizeModal.jsx';

configure({ adapter: new Adapter() });
jest.mock('axios');

describe('ProductSize Service Components', () => {
  it('renders without crashing', () => {
    const component = shallow(<ProductSize />);
  });

  it('should render correctly', () => {
    const component = shallow(<ProductSize />);
    expect(component).toMatchSnapshot();
  });

  it('should toggleOverlay should update state', () => {
    const component = mount(<ProductSize />);
    component.find('.overlay').simulate('click');
    expect(component.instance().state.overlay).toBe('overlay unhide');
    component.find('.overlay').simulate('click');
    expect(component.instance().state.overlay).toBe('overlay');
  });

  it('should update state after componentDidMount', () => {
    const spy = jest.spyOn(axios, 'get');
    expect(spy).toHaveBeenCalledTimes(0);

    const component = mount(<ProductSize />);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

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