// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import {
  Hidden,
  SwipeableDrawer,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React from "react";

//local imports
import { ITask } from "../Tasks";
import { ITaskList } from "../TaskLists";
import TaskListsDrawer from "./TaskListsDrawer";
import TaskListView from "./TaskListView";
import ToDoAppBar from "./ToDoAppBar";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles(() => ({
  root: {
    width: "100vw",
    height: "100vh",
  },
  appBody: {
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr",
  },
  appBar: {
    gridColumn: "1/2",
    gridRow: "1/2",
  },
  contentContainer: {
    gridColumn: "1/2",
    gridRow: "2/3",
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    gridTemplateRows: "1fr",
    overflow: "hidden",
  },
  drawerContainer: {
    gridColumn: "1/2",
    gridRow: "1/2",
    overflow: "hidden",
  },
  tasksInterface: {
    gridColumn: "2/3",
    gridRow: "1/1",
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr",
  },
  // root: {
  //   width: "100%",
  //   height: "100%",
  //   display: "grid",
  //   gridTemplateColumns: "1fr",
  //   gridTemplateRows: "auto 1fr",
  // },
  toolbarContainer: {
    gridColumn: "1/2",
    gridRow: "1/2",
  },
  viewContainer: {
    gridColumn: "1/2",
    gridRow: "2/3",
    overflow: "hidden",
  },
}));


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------- Component Definition ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
  showTaskLists: boolean,
  setShowTaskLists: (inVisible: boolean) => void;
  setShowTaskListDialog: (inVisible: boolean) => void;
  setShowTaskDialog: (inVisible: boolean) => void;
  taskLists: ITaskList[],
  selectedTaskList: ITaskList | null,
  setSelectedTaskList: (inTaskList: ITaskList | null) => Promise<void>;
  tasks: ITask[],
  selectedTask: ITask | null,
};

// actual component
const BaseLayout: React.FC<Props> = (props) => {
  
  const { 
    showTaskLists, 
    setShowTaskLists, 
    setShowTaskListDialog,
    setShowTaskDialog,
    taskLists, 
    selectedTaskList,
    setSelectedTaskList,
    tasks,  
    // selectedTask,
  } = props;

  const classes = useStyles();

  const drawer = (
    <TaskListsDrawer 
      taskLists={taskLists}
      selectedTaskList={selectedTaskList}
      setSelectedTaskList={setSelectedTaskList}
      setShowTaskListDialog={setShowTaskListDialog}
    />
  );

  return (
    
    <div className={classes.root}>

      <Hidden mdUp>
        <SwipeableDrawer 
          anchor="left" 
          open={showTaskLists} onClose={() => setShowTaskLists(false)} 
          onOpen={() => setShowTaskLists(true)} 
        >
          {drawer}
        </SwipeableDrawer>
      </Hidden>

      <div className={classes.appBody}>

        <div className={classes.appBar}>
          <ToDoAppBar
            showTaskLists={showTaskLists}
            setShowTaskLists={setShowTaskLists}
            setShowTaskDialog={setShowTaskDialog}
          />
        </div>

        <div className={classes.contentContainer}>
          
          <Hidden smDown>
            <div className={classes.drawerContainer}>
              {drawer}
            </div>
          </Hidden>

          <div className={classes.tasksInterface}>

            <div className={classes.toolbarContainer}>
              toolbar
            </div>

            <div className={classes.viewContainer}>
              <TaskListView tasks={tasks}/>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Exports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export default BaseLayout;


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------