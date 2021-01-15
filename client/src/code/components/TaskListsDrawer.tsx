// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React from "react";
import {
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// local imports
import { ITaskList } from "../TaskLists";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles((theme) => ({
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
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
  },
  headerTitle: {
  },
  composeButton: {
  },
  listContainer: {
    gridColumn: "1/2",
    gridRow: "2/3",
    overflow: "hidden",
  },
  list: {
    maxHeight: "100%",
    overflow: "auto",
    padding: `0 ${theme.spacing(2)}px 0 0`,
  },
  listItem: {
    borderRadius: `0 100px 100px 0`
  },
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
        <Typography variant="h5" className={classes.headerTitle}>
          Task Lists
        </Typography>
      </div>

      <div className={classes.listContainer}>
        <List
          component="nav"
          className={classes.list}
        >
          {/* All Tasks */}
          <ListItem
            button
            disableRipple
            selected={selectedTaskList === null}
            onClick={() => setSelectedTaskList(null)}
            className={classes.listItem}
          >
            <ListItemIcon>
              <Icon>inbox</Icon>
            </ListItemIcon>
            <ListItemText primary={selectedTaskList === null ? <b>All Tasks</b> : "All Tasks"} />
          </ListItem>

          {/* Custom Task Lists */}
          {taskLists.map((inTaskList) => (
            <ListItem
              key={inTaskList._id} 
              button
              disableRipple
              selected={selectedTaskList?._id === inTaskList._id}
              onClick={() => setSelectedTaskList(inTaskList)}
              className={classes.listItem}
            >
              <ListItemIcon>
                <Icon>{inTaskList.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={selectedTaskList?._id === inTaskList._id ? <b>{inTaskList.title}</b> : inTaskList.title} />
            </ListItem>
          ))}

          {/* Add Task List */}
          <ListItem
            button
            disableRipple
            selected={false}
            onClick={handleComposeClick}
            className={classes.listItem}
          >
            <ListItemIcon>
              <Icon>add</Icon>
            </ListItemIcon>
            <ListItemText primary="Add Task List" />
          </ListItem>

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