// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React from "react";
import {
  List,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// local imports
import { ITask } from "../Tasks";
import TaskListItem from "./TaskListItem";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles((theme) => ({
  root: {
    maxHeight: "100%",
    overflow: "auto",
    paddingRight: theme.spacing(1),
  },
}));


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------- Component Definition ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
  tasks: ITask[],
  setSelectedTask: (inIndex: number | null) => void,
  setShowTaskDialog: (inVisible: boolean, inTaskID?: number) => void;
  deleteTask: (inTaskID: number) => Promise<void>;
};

// actual component
const TaskListView: React.FC<Props> = (props) => {
  
  const { 
    tasks,
    setSelectedTask,
    setShowTaskDialog,
    deleteTask,
  } = props;

  const classes = useStyles();

  return (

    <List className={classes.root}>
      {tasks.map((inTask, inIndex) => (
          <TaskListItem
            key={inTask._id}
            index={inIndex}
            task={inTask}
            setSelectedTask={setSelectedTask}
            setShowTaskDialog={setShowTaskDialog}
            deleteTask={deleteTask}
          />
      ))}
    </List>

  );
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Exports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export default TaskListView;


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------