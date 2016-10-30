import { describe } from 'ava-spec';
import React from 'react';
import { shallow } from 'enzyme';
import SpinningArrow from './SpinningArrow/SpinningArrow';


import App from './index';

describe('app', (it) => {
  it('renders spinning arrow with default values', (t) => {
    const wrapper = shallow(<App />);
    t.is(wrapper.contains(<SpinningArrow
      started={false}
      finalDegree={0}
    />), true);
  });
});

