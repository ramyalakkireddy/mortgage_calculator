import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Select, FormLabel, FormControl, MenuItem,
OutlinedInput, InputAdornment } from '@material-ui/core';
import mortgageImage from '../digital-mortgage.jpg';

const useStyles = makeStyles(theme => ({
   formControl: {
    marginTop: theme.spacing(1),
    width: '60%',
    minWidth: 120,
  },
  formLabel: {
    color: '#000000',
    fontSize: '1.15em',
    fontFamily: 'serif',
  }
}));

const amortizationPeriod = [...Array(60).keys()];
const interestTerm = [...Array(26).keys()];
const paymentFrequency = ['Monthly', 'Semi-Monthly', 'Bi-Weekly', 'Weekly', 'Accelerated Bi-Weekly', 'Accelerated Weekly'];

export default function MortgageForm(props) {
  const classes = useStyles();
  const { values, handleChange, handleCalculation } = props;

  return (
    <div>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <img src={mortgageImage} width="100%" height="100%" alt="mortgageHome" />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <Grid container spacing={3} direction="column">
          <Grid item xs={12}>
            <FormLabel component="legend" className={classes.formLabel}>Mortgage Amount:</FormLabel>
            <FormControl className={classes.formControl} variant="outlined">
             <OutlinedInput
                id="outlined-adornment-amount"
                type="number"
                value={(values.mortgageAmount)}
                onChange={handleChange('mortgageAmount')}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
             />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend" className={classes.formLabel}>Amortization Period:</FormLabel>
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={values.amortizationPeriod}
                  onChange={handleChange('amortizationPeriod')}
                >
                {amortizationPeriod.map((period) =>{
                    return (
                      <MenuItem value={period} key={period}>{period+' Years'}</MenuItem>
                      );
                    })
                }
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
             <FormLabel component="legend" className={classes.formLabel}>Payment Frequency:</FormLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={values.paymentFrequency}
                onChange={handleChange('paymentFrequency')}
              >
              {paymentFrequency.map((freq, index) =>{
                  return (
                    <MenuItem value={freq} key={index}>{freq}</MenuItem>
                    );
                  })
              }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
             <FormLabel component="legend" className={classes.formLabel}>Interest Rate:</FormLabel>
             <FormControl className={classes.formControl} variant="outlined">
               <OutlinedInput
                  id="outlined-adornment-percentage"
                  type="number"
                  value={values.interestRate}
                  onChange={handleChange('interestRate')}
                  endAdornment={<InputAdornment position="end">%</InputAdornment>}
               />
             </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormLabel component="legend" className={classes.formLabel}>Interest Term:</FormLabel>
              <FormControl variant="outlined" className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={values.interestTerm}
                  onChange={handleChange('interestTerm')}
                >
                {interestTerm.map((period) =>{
                    return (
                      <MenuItem value={period} key={period}>{period+' Years'}</MenuItem>
                      );
                    })
                }
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button color="primary" variant="contained" type="submit" onClick={handleCalculation('monthlyPayment')}>Calculate</Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </div>
  );
}
