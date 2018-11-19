import React from 'react';
import { shallow } from 'enzyme';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import VideosListItem from './VideosListItem';

configure({ adapter: new Adapter() });

describe('VideoListItem', () => {
    it('should render correctly in "debug" mode', () => {
    const component = shallow(<VideosListItem debug />);
    
    expect(component).toMatchSnapshot();
    });
});