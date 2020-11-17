import Button from "@material-ui/core/Button";
import { useState } from "react";
import Popover from "@material-ui/core/Popover";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import EmpTable from "./EmpTable";
import styles from "./PopoverForm.css";

function ValidateEmail(inputText) {
  inputText.trim();
  var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (inputText.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

function validate(e) {
  let newErrors = {};
  if (e.target[0].value === "") {
    newErrors.ok = 0;
    newErrors.emptyName = 1;
  }
  if (e.target[1].value === "") {
    newErrors.ok = 0;
    newErrors.emptyEmployeeID = 1;
  }
  if (e.target[2].value === "") {
    newErrors.ok = 0;
    newErrors.emptyDepartment = 1;
  }
  if (!ValidateEmail(e.target[3].value)) {
    newErrors.ok = 0;
    newErrors.emptyEmail = "Enter a valid email address";
  }
  if (e.target[3].value === "") {
    newErrors.ok = 0;
    newErrors.emptyEmail = "Field can't be empty";
  }
  if (e.target[4].value === "2020-11-15") {
    newErrors.ok = 0;
    newErrors.emptyDOJ = 1;
  }
  return newErrors;
}

function PopoverForm() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [errors, setErrors] = useState({});

  const handleDelete = (idx) => {
    let newData = [...tableData];
    newData.splice(idx, 1);
    setTableData(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    let newErrors = validate(e);
    if (newErrors.ok === 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    let newRow = {
      id: "",
      Name: e.target[0].value,
      EmployeeID: e.target[1].value,
      Department: e.target[2].value,
      Email: e.target[3].value,
      DOJ: e.target[4].value,
    };
    let newData = [...tableData];
    newData.push(newRow);
    setTableData(newData);
    handleClose();
  };

  const clearData = (e) => {
    e.preventDefault();
    document.getElementById("empform").reset();
  };

  const handleClick = (e) => {
    setErrors({});
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClick}
        className="button"
        style={{ margin: "auto", display: "flex" }}
      >
        Add Employee
      </Button>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        className="popover"
      >
        <Card className="card">
          <CardContent>
            <form
              className=""
              noValidate
              autoComplete="off"
              id="empform"
              onSubmit={handleSubmit}
            >
              <TextField
                id="name"
                label="Name"
                className="txtfield"
                error={errors.emptyName === 1 ? true : false}
                helperText={errors.emptyName ? "Field can't be empty" : ""}
              />
              <br />
              <TextField
                id="EmpId"
                className="txtfield"
                label="Employee ID"
                error={errors.emptyEmployeeID === 1 ? true : false}
                helperText={
                  errors.emptyEmployeeID ? "Field can't be empty" : ""
                }
              />
              <br />
              <TextField
                id="Department"
                label="Department"
                className="txtfield"
                error={errors.emptyDepartment === 1 ? true : false}
                helperText={
                  errors.emptyDepartment ? "Field can't be empty" : ""
                }
              />
              <br />
              <TextField
                id="standard-basic"
                type="email"
                label="Email ID"
                className="txtfield"
                error={errors.emptyEmail !== undefined ? true : false}
                helperText={
                  errors.emptyEmail !== undefined ? errors.emptyEmail : ""
                }
              />
              <br />
              <TextField
                id="date"
                type="date"
                label="Date of Joining"
                defaultValue="2020-11-15"
                className="txtfield"
                error={errors.emptyDOJ === 1 ? true : false}
                helperText={
                  errors.emptyDOJ ? "Select your date of joining" : ""
                }
              />
              <br />
              <Button
                size="small"
                type="submit"
                variant="contained"
                color="secondary"
                style={{ marginTop: "10px", marginLeft: "5px" }}
              >
                Submit
              </Button>
              <Button
                size="small"
                variant="contained"
                className="clear-btn"
                style={{ marginLeft: "14px", marginTop: "10px" }}
                onClick={clearData}
              >
                Clear
              </Button>
            </form>
          </CardContent>
        </Card>
      </Popover>
      <EmpTable data={tableData} handleDelete={handleDelete}></EmpTable>
    </div>
  );
}
export default PopoverForm;
