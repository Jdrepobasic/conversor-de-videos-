import React from 'react';
import Header from '../components/Header';
import Home from './Home';
import SendVideoForm from '../components/SendVideoForm';
import VideosList from '../components/VideosList';

import { shallow } from 'enzyme';
import { configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const wrapper = shallow(<Home />);
describe('Components rendering', () => {
    it('renders <Header /> components', () => {  
        expect(wrapper.find(Header));
    });
    it('renders <Header /> components', () => {
        expect(wrapper.find(SendVideoForm));
    });
    it('renders <Header /> components', () => {
        expect(wrapper.find(VideosList));
    });
});