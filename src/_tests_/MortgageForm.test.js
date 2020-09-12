import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import MortgageForm from '../components/MortgageForm';

const values = {
  mortgageAmount: '100000',
  amortizationPeriod: '25',
  paymentFrequency: 'Monthly',
  interestRate: '5',
  interestTerm: '5'
}

const handleChange = jest.fn();
const handleCalculation = jest.fn();

describe("MortgageForm", () => {

  test("snapshot renders", () => {
    const component = renderer.create(<MortgageForm values={values} handleChange={handleChange} handleCalculation={handleCalculation} />);
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

});
