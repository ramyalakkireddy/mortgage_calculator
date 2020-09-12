import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import MortgageCalculator from '../components/MortgageCalculator';

describe("MortgageCalculator", () => {

  test('snapshot renders', () => {
    const component = renderer.create(<MortgageCalculator />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  
});
