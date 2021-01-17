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
    paddingBottom: theme.spacing(1),
  },
}));


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------- Component Definition ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
  tasks: ITask[],
  selectedTasks: Set<number>,
  setSelectedTasks: (inAction: string, inTaskID?: number) => void;
  setSelectedTask: (inIndex: number | null) => void,
  setShowTaskDialog: (inVisible: boolean, inTaskID?: number) => void;
  deleteTask: (inTaskID: number) => Promise<void>;
  editTaskField: (inTaskID: number, inField: string, inValue: any) => Promise<void>;
};

// actual component
const TaskListView: React.FC<Props> = (props) => {
  
  const { 
    tasks,
    selectedTasks,
    setSelectedTasks,
    setSelectedTask,
    setShowTaskDialog,
    deleteTask,
    editTaskField,
  } = props;

  const classes = useStyles();

  return (

    <List disablePadding className={classes.root}>
      {tasks.map((inTask, inIndex) => (
          <TaskListItem
            key={inTask._id}
            index={inIndex}
            task={inTask}
            selected={inTask._id ? selectedTasks.has(inTask._id) : false}
            setSelectedTasks={setSelectedTasks}
            setSelectedTask={setSelectedTask}
            setShowTaskDialog={setShowTaskDialog}
            deleteTask={deleteTask}
            editTaskField={editTaskField}
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