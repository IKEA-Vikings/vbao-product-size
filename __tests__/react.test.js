import React from 'react';
import {mount,shallow,render,configure} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from '../client/App.jsx';
import ProductSizeButton from '../client/ProductSizeButton.jsx';
import ProductSizeModal from '../client/ProductSizeModal.jsx';

configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders without crashing', () => {
    const component = shallow(<App />);
  });

  it('should render correctly', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });
});