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
import TaskListViewToolbar from "./TaskListViewToolbar";
import TaskView from "./TaskView";
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
  setShowTaskDialog: (inVisible: boolean, inTaskID?: number) => void;
  taskLists: ITaskList[],
  selectedTaskList: number | string,
  setSelectedTaskList: (inTaskListID: number | string) => Promise<void>,
  tasks: ITask[],
  selectedTasks: Set<number>,
  setSelectedTasks: (inAction: string, inTaskID?: number) => void;
  selectedTask: number | null,
  setSelectedTask: (inIndex: number | null) => void,
  currentView: string,
  deleteTask: (inTaskID: number) => Promise<void>,
  editTaskField: (inTaskID: number, inField: string, inValue: any) => Promise<void>,
  editSelectedTasks: (inAction: string, inTaskListID?: number) => Promise<void>,
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
    selectedTasks,
    setSelectedTasks,
    selectedTask,
    setSelectedTask,
    currentView,
    deleteTask,
    editTaskField,
    editSelectedTasks,
  } = props;

  const classes = useStyles();

  const drawer: React.ReactElement = (
    <TaskListsDrawer 
      taskLists={taskLists}
      selectedTaskList={selectedTaskList}
      setSelectedTaskList={setSelectedTaskList}
      setShowTaskListDialog={setShowTaskListDialog}
    />
  );

  let toolbar: React.ReactElement;
  if (true) {
    toolbar = (
      <TaskListViewToolbar
        noneSelected={selectedTasks.size === 0}
        allSelected={tasks.length === selectedTasks.size}
        setSelectedTasks={setSelectedTasks}
        taskLists={taskLists}
        editSelectedTasks={editSelectedTasks}
      />
    );
  }

  let view: React.ReactElement;
  if (currentView === "task-list-view") {
    view = (
      <TaskListView 
        tasks={tasks} 
        selectedTasks={selectedTasks}
        setSelectedTasks={setSelectedTasks}
        setSelectedTask={setSelectedTask}
        setShowTaskDialog={setShowTaskDialog}
        deleteTask={deleteTask}
        editTaskField={editTaskField}
      />
    );
  } else if (currentView === "task-view" && selectedTask !== null) {
    view = <TaskView task={tasks[selectedTask]}/>
  } else {
    view = (
      <TaskListView 
        tasks={tasks} 
        selectedTasks={selectedTasks}
        setSelectedTasks={setSelectedTasks}
        setSelectedTask={setSelectedTask}
        setShowTaskDialog={setShowTaskDialog}
        deleteTask={deleteTask}
        editTaskField={editTaskField}
      />
    );
  }

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
              {toolbar}
            </div>

            <div className={classes.viewContainer}>
              {view}
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