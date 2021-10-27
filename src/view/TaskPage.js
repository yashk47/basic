import * as React from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import get from "lodash/get";
import TableRow from "@mui/material/TableRow";
import { connect } from "react-redux";
import { fetchTaskList, configTaskData } from "./../action/task";
import { Formik, Form, Field } from "formik";
import Typography from "@mui/material/Typography";
import { Button, Grid, Switch } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import { useSpring, animated } from "react-spring";
import Modal from "@mui/material/Modal";

const columns = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "title", label: "Title", minWidth: 200 },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
  },
];

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  textAlign: "center",
  p: 4,
};

function TaskPage({ fetchTaskList, configTaskData, taskData }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [taskList, setTaskList] = React.useState([]);
  const windowWidth = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = React.useState(false);
  const handleChangeModal = () => setOpen(!open);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onDeleteTask = (event) => {
    const index = event.currentTarget.attributes["data-index"].value;
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    configTaskData([...updatedTaskList]);
  };

  const onAddNewTask = (values, { resetForm }) => {
    let updatedValues = { ...values };
    updatedValues.id = taskList[taskList.length - 1].id + 1;
    const updatedTaskList = [...taskList];
    updatedTaskList.unshift({ ...updatedValues });
    configTaskData([...updatedTaskList]);
    resetForm();
    handleChangeModal();
  };

  React.useEffect(() => {
    fetchTaskList(
      (data) => {
        configTaskData([...data]);
      },
      (err) => {
        console.log(err);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setTaskList([...taskData]);
  }, [taskData]);

  return (
    <div style={{ marginTop: "5%" }}>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <Paper sx={{ width: windowWidth ? "80%" : "95%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        background: "black",
                        color: "white",
                      }}
                    >
                      <b> {column.label} </b>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {taskList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.title}</TableCell>
                        <TableCell>
                          {row.completed ? "TRUE" : "FALSE"}
                        </TableCell>
                        <TableCell>
                          <Button
                            data-index={index}
                            onClick={onDeleteTask}
                            color={"error"}
                          >
                            DELETE
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={taskList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <div>
        <Grid alignItems="center" justifyContent="center" container>
          <Grid
            xs={12}
            style={{
              display: "flex",
              paddingTop: !windowWidth ? "15%" : "2%",
              justifyContent: "center",
            }}
            item
          >
            <Button
              style={{ background: "black" }}
              variant="contained"
              onClick={handleChangeModal}
              startIcon={<AddIcon />}
            >
              Add Task
            </Button>
          </Grid>
        </Grid>
      </div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleChangeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              style={{ paddingBottom: "5%" }}
              id="spring-modal-title"
              variant="h6"
              component="h2"
            >
              Add New Task
            </Typography>
            <Formik
              initialValues={{ title: "", completed: false }}
              enableReinitialize={true}
              onSubmit={onAddNewTask}
            >
              {() => {
                return (
                  <Form>
                    <Grid
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                      spacing={2}
                      container
                    >
                      <Grid xs={10} item>
                        <Field
                          as={TextField}
                          fullWidth
                          id="title"
                          label="Title"
                          name="title"
                        />
                      </Grid>

                      <Grid
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          alignContent: "space-around",
                          justifyContent: "center",
                        }}
                        xs={10}
                        item
                      >
                        <Typography>Status</Typography>
                        <Field
                          as={Switch}
                          fullWidth
                          id="completed"
                          label="Status"
                          name="completed"
                        />
                      </Grid>
                      <Grid style={{ paddingTop: "10%" }} xs={10} item>
                        <Button type="submit" variant="contained">
                          ADD
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
            <Typography
              id="spring-modal-description"
              sx={{ mt: 2 }}
            ></Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({
  taskData: get(state, "task.taskList"),
});

export default connect(mapStateToProps, {
  fetchTaskList,
  configTaskData,
})(TaskPage);
