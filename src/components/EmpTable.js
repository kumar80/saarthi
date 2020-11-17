import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from '@material-ui/icons/Delete';
import styles from "./EmpTable.css";

function EmpTable(props) {
  const { data, handleDelete } = props;

  data.forEach((r, i) => {
    r.id = i;
  });

  const columns = [
    { field: "Name" },
    { field: "EmployeeID" },
    { field: "Department" },
    { field: "Email" },
    { field: "Date Of Joining" },
  ];
  
  return (
    <Paper width="100%" className="paper">
      <TableContainer id="11" className="tableFixHeader">
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">{columns[0].field}</TableCell>
              <TableCell align="center">{columns[1].field}</TableCell>
              <TableCell align="center">{columns[2].field}</TableCell>
              <TableCell align="center">{columns[3].field}</TableCell>
              <TableCell align="center">{columns[4].field}</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i} className={i&1?"rowodd":""}>
                <TableCell component="th" scope="row" align="center">
                  {row.Name}
                </TableCell>
                <TableCell align="center">{row.EmployeeID}</TableCell>
                <TableCell align="center">{row.Department}</TableCell>
                <TableCell align="center">{row.Email}</TableCell>
                <TableCell align="center">{row.DOJ}</TableCell>
                <TableCell align="center">
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(i)}
                  >
                   <DeleteIcon>Delete</DeleteIcon> 
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default EmpTable;
