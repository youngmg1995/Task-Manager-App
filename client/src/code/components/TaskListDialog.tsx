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
    MenuItem,
    TextField,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// local imports
import { ITaskList } from "../TaskLists";
import TaskListIcons from "./TaskListIcons";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles(() => ({
  root: {
  },
}));

const iconSelectProps: any = {
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
        maxHeight: 160,
      },
    },
  }
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------- Component Definition ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
  open: boolean,
  setOpen: (inVisible: boolean) => void,
  taskList: ITaskList,
  setTaskList: (inTaskList?: ITaskList) => void,
  submitTaskList: () => Promise<void>,
};

// actual component
const TaskListDialog: React.FC<Props> = (props) => {
  
  const {
    open,
    setOpen,
    taskList,
    setTaskList,
    submitTaskList,
  } = props;
  console.log(taskList);

  function handleClose(): void {
    setTaskList();
    setOpen(false);
  }

  function handleFormChange(event: any): void {

    // grab task list field name and value
    const fieldName: keyof ITaskList = event.target.name;
    const value: any = event.target.value;

    // initiate variable for storing altered task list
    let newTaskList: ITaskList = Object.assign( {}, taskList);

    // reassign value of field 
    Object.assign(
      newTaskList,
      { [fieldName]: value }
    );

    // save changes
    setTaskList(newTaskList);

  }

  function handleSubmit(): void {
    submitTaskList();
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
        {taskList._id ? "Edit Task List" : "Compose Task List"}
      </DialogTitle>

      <DialogContent>
        <form noValidate autoComplete="off">
          {/* title */}
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            fullWidth
            value={taskList.title}
            onChange={handleFormChange}
          />
          {/* icon */}
          <TextField
            select
            margin="dense"
            label="Icon"
            // fullWidth
            name="icon"
            SelectProps={iconSelectProps}
            value={taskList.icon}
            onChange={handleFormChange}
          >
            {TaskListIcons.map((inIcon) => (
                <MenuItem key={inIcon} value={inIcon}>
                  <Icon color="primary">{inIcon}</Icon>
                </MenuItem>
            ))}
          </TextField>
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

export default TaskListDialog;


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------