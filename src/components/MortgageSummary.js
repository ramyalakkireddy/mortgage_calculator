import React from 'react';
import { Grid, Typography, FormLabel, Button, Divider, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BarChart from '@material-ui/icons/BarChart';
import Edit from '@material-ui/icons/EditTwoTone';
import AmortizationTable from './AmortizationTable';
import PaymentChart from './PaymentChart';

const useStyles = makeStyles(theme => ({
  text: {
    fontFamily: 'serif',
    fontWeight: '600',
  },
  title: {
    marginTop: '30px',
    fontFamily: 'serif',
  },
  card: {
    height: '100%',
    backgroundColor: 'lightseagreen',
    color: '#ffffff',
  },
  amount: {
    fontFamily: 'serif',
  },
  grid: {
    textAlign: 'center',
  },
  formLabel: {
    color: '#000000',
    fontSize: '1.15em',
    fontFamily: 'serif',
    fontWeight: '600',
  },
  paymentSummary: {
    color: '#3f51b5',
  },
  button: {
    textAlign: 'end',
    color: 'lightseagreen',
    fontWeight: '600',
  },
  chartButton: {
    color: '#ffffff',
    textTransform: 'initial',
    cursor: 'pointer',
  },
  divider: {
    marginTop: '30px',
  }
}));

const formatter = (amount) => {
  return (
    new Intl.NumberFormat('en-CA',
      { style: 'currency', currency: 'CAD' }
    ).format(amount)
  );
}

export default function MortgageSummary(props) {
  const classes = useStyles();
  const { values, amortization, goBack } = props;
  const [openChart, setOpenChart] = React.useState(false);

  const handleClickOpenChart = () => event => {
    event.preventDefault();
    setOpenChart(true);
  };

  const handleCloseChart = (prop) => {
    setOpenChart(false);
  };

  const handleForm = () => {
    goBack();
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6} className={classes.grid}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5" className={classes.title}>{values.paymentFrequency} Payment</Typography>
              <Typography variant="h2" className={classes.amount}>
                {formatter(props.paymentAmount)}
              </Typography>
              <Button className={classes.chartButton} onClick={handleClickOpenChart()}><BarChart />View Payment Chart</Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={3}>
            <Grid item xs={7}>
              <Typography variant="h5" className={classes.text}>Mortgage Details:</Typography>
            </Grid>
            <Grid item xs={5} className={classes.button}>
              <Button className={classes.button} onClick={handleForm}><Edit /> Edit Details</Button>
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend" className={classes.formLabel}>Mortgage Amount: </FormLabel>
            </Grid>
            <Grid item xs={6}>
              {values.mortgageAmount}
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend" className={classes.formLabel}>Amortization Period: </FormLabel>
            </Grid>
            <Grid item xs={6}>
              {(values.amortizationPeriod+' Years')}
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend" className={classes.formLabel}>Interest Rate: </FormLabel>
            </Grid>
            <Grid item xs={6}>
              {values.interestRate+'%'}
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend" className={classes.formLabel}>Interest Term: </FormLabel>
            </Grid>
            <Grid item xs={6}>
              {(values.interestTerm+' Years')}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <AmortizationTable amortization={amortization} />
      {openChart && <PaymentChart amortization={amortization} open={openChart} onClose={handleCloseChart} />}
    </div>
  );
}
