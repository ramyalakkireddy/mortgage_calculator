import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Table, Grid, Typography
} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'dimgrey',
    fontFamily: 'serif',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const formatter = (amount) => {
  return (
    new Intl.NumberFormat('en-CA',
      { style: 'currency', currency: 'CAD' }
    ).format(amount)
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: 'auto'
  },
  text: {
    margin: '20px 0',
    fontFamily: 'serif',
    fontWeight: '600',
  },
  table: {
    minWidth: 650,
    overflow: 'hidden'
  },
  tableRow: {
    fontSize:  theme.typography.pxToRem(16)
  }
}));

const columns = [
  { id: 'year', label: 'Year' },
  { id: 'interest', label: 'Interest Paid' },
  { id: 'principal', label: 'Principal Paid' },
  { id: 'balance', label: 'Balance' }
];

export default function AmortizationTable(props) {
  const classes = useStyles();
  const { amortization } = props;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
      <Grid container direction="row">
        <Grid item xs={12}>
          <Typography variant="h5" className={classes.text}>Amortization Table:</Typography>
          <TableContainer className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.header}>
                <TableRow>
                  {columns.map(column => (
                    <StyledTableCell
                      className={classes.tableRow}
                      key={column.id}
                      align="left"
                    >{column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
                <TableBody>
                  {amortization.length > 0 && amortization
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((data, index) => {
                        return (
                          <StyledTableRow hover key={data.year}>
                            <StyledTableCell>{data.year}</StyledTableCell>
                            <StyledTableCell>{formatter(data.interestN)}</StyledTableCell>
                            <StyledTableCell>{formatter(data.principalN)}</StyledTableCell>
                            <StyledTableCell>{formatter(data.balance)}</StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={amortization.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
  );
};
