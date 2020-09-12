import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import MortgageSummary from '../components/MortgageSummary';
import AmortizationTable from '../components/AmortizationTable';
import PaymentChart from '../components/PaymentChart';

const values = {
  mortgageAmount: '100000',
  amortizationPeriod: '25',
  paymentFrequency: 'Monthly',
  interestRate: '5',
  interestTerm: '5'
};
const paymentAmount = 581.61;
const amortization = [];

describe("MortgageSummary", () => {

  test('snapshot renders', () => {
    const component = shallow(<MortgageSummary values={values} paymentAmount={paymentAmount} amortization={amortization} />);
    let tree = component.getElements();
    expect(tree).toMatchSnapshot();
  });

  test("should render AmortizationTable component", () => {
    const component = shallow(<MortgageSummary values={values} paymentAmount={paymentAmount} amortization={amortization} />);
    let tree = component.getElements();
    expect(component.find(AmortizationTable).length).toEqual(1);
  })

});
