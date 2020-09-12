import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, Dialog, DialogActions, DialogContent
} from '@material-ui/core';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis, Tooltip
} from '@devexpress/dx-react-chart-material-ui';
import { Animation, EventTracker } from '@devexpress/dx-react-chart';

const useStyles = makeStyles(theme => ({
  root: {
    overflowY: 'auto',
    paddingTop: '0px !important'
  }
}));

export default function PaymentChart(props) {
  const classes = useStyles();
  const { amortization, onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth
      maxWidth={false}
    >
      <DialogContent className={classes.root}>
        <Paper elevation={3}>
          <Chart
            data={amortization}
          >
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries
              valueField="balance"
              argumentField="year"
            />
            <Title text="Payment Graph" />
            <EventTracker />
            <Tooltip />
            <Animation />
          </Chart>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
