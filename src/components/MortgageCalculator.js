import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import {calculatePayment, calculateAmortization} from './calculations.js';
import MortgageForm from './MortgageForm';
import MortgageSummary from './MortgageSummary';

const useStyles = makeStyles(theme => ({
  root: {
   flexGrow: 1,
   padding: theme.spacing(2),
   margin: '20px',
   },
   paper: {
     padding: theme.spacing(2),
   },
   title: {
     marginBottom: '20px',
     fontFamily: 'serif',
   }
}));

export default function MortgageCalculator() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    mortgageAmount: '100000',
    amortizationPeriod: '25',
    paymentFrequency: 'Monthly',
    interestRate: '5',
    interestTerm: '5'
  });
  const [paymentAmount, setPaymentAmount] = React.useState('');
  const [amortization, setAmortization] = React.useState([]);
  const [displayForm, setDisplayForm] = React.useState(true);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPaymentAmount('');
  };

  const handleCalculation = (prop) => (event) => {
    event.preventDefault();
    const principal = values.mortgageAmount;
    const years = values.amortizationPeriod;
    const rate = values.interestRate;
    const frequency = values.paymentFrequency;
    const finalAmount = calculatePayment(principal, years, rate, frequency);
    const finalAmortization = calculateAmortization(principal, years, rate, frequency);
    setPaymentAmount(finalAmount);
    setAmortization(finalAmortization);
    setDisplayForm(false);
  };

  const handlePageNavigation = () => {
    setDisplayForm(true);
    setPaymentAmount('');
  }

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>Mortgage Payment Calculator</Typography>
      <Paper className={classes.paper} elevation={3}>
        {(!paymentAmount && displayForm) ? <MortgageForm values={values} handleChange={handleChange} handleCalculation={handleCalculation}/>
        : <MortgageSummary values={values} paymentAmount={paymentAmount} amortization={amortization} goBack={handlePageNavigation} />}
      </Paper>
    </div>
  );
}
