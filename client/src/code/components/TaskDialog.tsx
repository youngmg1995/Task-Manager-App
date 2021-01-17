// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    // DialogContentText,
    DialogTitle,
    Icon,
    ListItemIcon,
    ListItemText,
    MenuItem,
    TextField,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// local imports
import { ITask } from "../Tasks";
import { ITaskList } from "../TaskLists";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles(() => ({
  root: {
  },
  listItemIcon: {
    minWidth: "44px",
  },
}));

const selectProps: any = {
  // renderValue: (value: any) => <React.Fragment><div>{value}</div><div>this</div></React.Fragment>,
  MenuProps:{
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    getContentAnchorEl:null,
    PaperProps: {
      style: {
        maxHeight: "192px",
      },
    },
  },
  SelectDisplayProps: {
    style: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  },
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------- Component Definition ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
  open: boolean,
  setOpen: (inVisible: boolean) => void,
  task: ITask,
  setTask: (inTask?: ITask) => void,
  submitTask: () => Promise<void>,
  taskLists: ITaskList[],
};

// actual component
const TaskDialog: React.FC<Props> = (props) => {
  
  const {
    open,
    setOpen,
    task,
    setTask,
    submitTask,
    taskLists,
  } = props;

  // function renderValue(inValue: any): React.E

  function handleFormChange(event: any): void {

    // grab task field name and value
    const fieldName: keyof ITask = event.target.name;
    const value: any = event.target.value;

    // initiate variable for storing altered task
    let newTask: ITask = Object.assign( {}, task);

    // remove field from task if value set to undefined
    if (event.target.value === undefined) {
      delete newTask[fieldName];
    }
    // else reassign value of field 
    else {
      Object.assign(
        newTask,
        { [fieldName]: value }
      );
    }

    // save changes
    setTask(newTask);

  }

  function handleClose(): void {
    setOpen(false);
  }

  function handleSubmit(): void {
    submitTask();
  }

  const classes = useStyles();

  return (

    <Dialog 
      open={open}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
      className={classes.root}
    >

      <DialogTitle id="form-dialog-title">
        {task._id ? "Edit Task" : "New Task"}
      </DialogTitle>

      <DialogContent>
        <form noValidate autoComplete="off">
          {/* title */}
          <TextField
            autoFocus={!task._id}
            required
            margin="dense"
            label="Title"
            fullWidth
            name="title"
            value={task.title}
            onChange={handleFormChange}
          />
          {/* task list */}
          <TextField
            select
            margin="dense"
            label="Task List"
            fullWidth
            name="taskList"
            SelectProps={selectProps}
            value={task.taskList}
            onChange={handleFormChange}
          >
            <MenuItem value={undefined}>
              <ListItemIcon classes={{root: classes.listItemIcon}}>
                <Icon>label_off</Icon>
              </ListItemIcon>
              <ListItemText primary={<em>None</em>} />
            </MenuItem>
            {taskLists.map((inTaskList) => (
              <MenuItem key={inTaskList._id} value={inTaskList._id}>
                <ListItemIcon classes={{root: classes.listItemIcon}}>
                  <Icon>{inTaskList.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={inTaskList.title} />
              </MenuItem>
            ))}
          </TextField>
          {/* description */}
          <TextField
            required
            margin="dense"
            label="Description"
            fullWidth
            multiline
            name="description"
            value={task.description}
            onChange={handleFormChange}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>

    </Dialog>

  );

};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Exports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export default TaskDialog;


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------