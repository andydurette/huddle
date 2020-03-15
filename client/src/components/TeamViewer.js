import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddUser from './AddUsers/AddUser'
import User from './AddUsers/User';
const columns = [
  { id: 'Fname', label: 'First Name', minWidth: 170 },
  { id: 'Lname', label: 'Last Name', minWidth: 170 },
  { id: 'Stats', label: 'Stats', minWidth: 100 },
  {
    id: 'Role',
    label: 'Role',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
  
];

function createData(Fname,Lname, Stats, Role,) {
  return { Fname,Lname, Stats, Role,};
}

const rows = [
  createData('Billy', 'Bob', "1324171354", "Defender"),
  createData('Seto', 'Kaiba', "1324171354", "Defender"),
  createData('John', 'Wick', "1324171354", "Defender"),
  createData('Ash ', 'Ketchum', "1324171354", "Defender"),
  createData('Walter ', 'White', "1324171354", "Defender"),
  createData('Bruce ', 'Wayne', "1324171354", "Defender"),
  createData('Billy', 'Bob', "1324171354", "Defender"),
  createData('Seto', 'Kaiba', "1324171354", "Defender"),
  createData('John', 'Wick', "1324171354", "Defender"),
  createData('Ash ', 'Ketchum', "1324171354", "Defender"),
  createData('Walter ', 'White', "1324171354", "Defender"),
  createData('Bruce ', 'Wayne', "1324171354", "Defender"),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Teamviewer() {
  const classes = useStyles();
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
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <AddUser/>
      <User/>
    </Paper>
  );
}
