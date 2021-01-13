// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// local imports
import { ITaskList } from "../TaskLists";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles(() => ({
  root: {
    width: 250,
    height: "100%",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr",
    overflow: "hidden",
  },
  headerContainer: {
    gridColumn: "1/2",
    gridRow: "1/2",
    padding: "8px 8px",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  headerTitle: {
  },
  composeButton: {
  },
  taskListsContainer: {
    gridColumn: "1/2",
    gridRow: "2/3",
    overflow: "hidden",
  },
  taskLists: {
    maxHeight: "100%",
    overflow: "auto",
    padding: "0",
  }
}));


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------- Component Definition ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
  taskLists: ITaskList[],
  selectedTaskList: ITaskList | null,
  setSelectedTaskList: (inTaskList: ITaskList | null) => Promise<void>,
  setShowTaskListDialog: (inVisible: boolean) => void,
};

// actual component
const TaskListsDrawer: React.FC<Props> = (props) => {
  
  const { 
    taskLists,
    selectedTaskList,
    setSelectedTaskList,
    setShowTaskListDialog,
  } = props;

  const classes = useStyles();

  function handleComposeClick(): void {    
    setShowTaskListDialog(true);
  };

  return (

    <div className={classes.root}>

      <div className={classes.headerContainer}>
        <Typography variant="h6" className={classes.headerTitle}>
          Task Lists
        </Typography>
        <IconButton color="primary" aria-label="compose-taskList" onClick={handleComposeClick} className={classes.composeButton}>
          <AddCircleIcon fontSize="large"/>
        </IconButton>
      </div>

      <div className={classes.taskListsContainer}>
        <List
          component="nav"
          className={classes.taskLists}
        >
          <ListItem 
            button
            selected={selectedTaskList === null}
            onClick={() => setSelectedTaskList(null)}
          >
            <ListItemText primary="All Tasks" />
          </ListItem>

          {taskLists.map((inTaskList) => (
            <ListItem
              key={inTaskList._id} 
              button
              selected={selectedTaskList?._id === inTaskList._id}
              onClick={() => setSelectedTaskList(inTaskList)}
            >
              <ListItemText primary={inTaskList.title} />
            </ListItem>
          ))}

        </List>
      </div>

    </div>

  );
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Exports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export default TaskListsDrawer;


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------