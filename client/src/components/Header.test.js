import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Header', () => {
    it('should render correctly in "debug" mode', () => {
    const component = shallow(<Header debug />);
    
    expect(component).toMatchSnapshot();
    });
});