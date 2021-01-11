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
    TextField,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// local imports
import { ITaskList } from "../TaskLists";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles(() => ({
  root: {
  },
}));


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

  function handleClose(): void {
    setTaskList();
    setOpen(false);
  }

  function handleFormChange(event: any): void {
    const newTaskList: ITaskList = Object.assign(
      {}, 
      taskList,
      { [event.target.id]: event.target.value }
    );
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
        New Task List
      </DialogTitle>

      <DialogContent>
        <form noValidate autoComplete="off">
          {/* title */}
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            value={taskList.title}
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

export default TaskListDialog;


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------