// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import { 
  // Container,
  // Divider,
  Grid,
  Hidden,
  SwipeableDrawer,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React from "react";

//local imports
import { ITask } from "../Tasks";
import { ITaskList } from "../TaskLists";
import TaskListsDrawer from "./TaskListsDrawer";
import TaskListUI from "./TaskListUI";
import ToDoAppBar from "./ToDoAppBar";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Styles ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

const useStyles: any = makeStyles(() => ({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr",
    width: "100vw",
    height: "100vh",
  },
  drawer: {
    overflow: "auto",
  },
}));


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------- Component Definition ------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
  showTaskLists: boolean,
  setShowTaskLists: (inVisible: boolean) => void;
  taskLists: ITaskList[],
  selectedTaskList: ITaskList | null,
  setSelectedTaskList: (inTaskList: ITaskList | null) => Promise<void>;
  tasks: any[],
  selectedTask: ITask | null,
};

// actual component
const BaseLayout: React.FC<Props> = (props) => {
  
  const { 
    showTaskLists, 
    setShowTaskLists, 
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
    />
  );

  return (
    <div className={classes.root}>
      
      <div>
        <ToDoAppBar
          showTaskLists={showTaskLists}
          setShowTaskLists={setShowTaskLists}
        />
      </div>

      <Hidden mdUp>
        <SwipeableDrawer 
          anchor="left" 
          open={showTaskLists} onClose={() => setShowTaskLists(false)} 
          onOpen={() => setShowTaskLists(true)} 
        >
          {drawer}
        </SwipeableDrawer>
      </Hidden>
      
      <Grid container alignItems="stretch" justify="center">
        <Hidden smDown>
            {drawer}
        </Hidden>
        <Grid item container xs alignItems="stretch" justify="center">
          {/* <div className={classes.appBody}>
            <TasksToolBar />
            <Divider />
            <div>
              Tasks
            </div>
          </div> */}
          <TaskListUI tasks={tasks}/>
        </Grid>
      </Grid>

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