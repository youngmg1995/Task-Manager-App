// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import { 
  // Container,
  // Divider,
  // Grid,
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
  tasksContainer: {
    gridColumn: "2/3",
    gridRow: "1/1",
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
          />
        </div>

        <div className={classes.contentContainer}>
          
          <Hidden smDown>
            <div className={classes.drawerContainer}>
              {drawer}
            </div>
          </Hidden>

          <div className={classes.tasksContainer}>
            <TaskListUI tasks={tasks}/>
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