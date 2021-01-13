// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React from "react";

// local imports
import {
  // LoadingScreen,
  BaseLayout,
  TaskDialog,
  TaskListDialog,
} from "./components";
import * as Tasks from "./Tasks";
import { ITask } from "./Tasks";
import * as TaskLists from "./TaskLists";
import { ITaskList } from "./TaskLists";



// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------ ToDoApp Component -------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
};
type State = {
  showLoadingScreen: boolean,
  showTaskLists: boolean,
  showTaskListDialog: boolean,
  dialogTaskList: ITaskList,
  showTaskDialog: boolean,
  dialogTask: ITask,
  taskLists: ITaskList[],
  selectedTaskList: ITaskList | null,
  tasks: ITask[],
  selectedTask: number | null,
  currentView: string,
};

// actual component
export default class ToDoApp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showLoadingScreen: true,
      showTaskLists: false,
      showTaskListDialog: false,
      dialogTaskList: {
        title: "",
      },
      showTaskDialog: false,
      dialogTask: {
        title: "",
        description: "",
      },
      taskLists: [],
      selectedTaskList: null,
      tasks: [],
      selectedTask: null,
      currentView: "task-list-view",
    };

    // for toggling loading screen
    this.setShowLoadingScreen = this.setShowLoadingScreen.bind(this);

    // for controling various components the user can view and interact with
    this.setShowTaskLists = this.setShowTaskLists.bind(this);

    // for creating and editing task lists
    this.setShowTaskListDialog = this.setShowTaskListDialog.bind(this);
    this.setDialogTaskList = this.setDialogTaskList.bind(this);
    this.submitTaskListDialog = this.submitTaskListDialog.bind(this);

    // for creating and editing tasks
    this.setShowTaskDialog = this.setShowTaskDialog.bind(this);
    this.setDialogTask = this.setDialogTask.bind(this);
    this.submitTaskDialog = this.submitTaskDialog.bind(this);

    // for selecting specific tasks to view
    this.setSelectedTask = this.setSelectedTask.bind(this);

    // for changing the view (user inferface) seen by the user
    this.setCurrentView = this.setCurrentView.bind(this);

    // other functionalities ( Ex: switching between selected task lists and tasks to view)
    this.addTaskList = this.addTaskList.bind(this);
    this.setSelectedTaskList = this.setSelectedTaskList.bind(this);
  }

  setShowLoadingScreen(inVisible: boolean): void {
    this.setState({
      showLoadingScreen: inVisible,
    });
  };

  setShowTaskLists(inVisible: boolean): void {
    this.setState({
      showTaskLists: inVisible,
    });
  };

  setShowTaskListDialog(inVisible: boolean): void {
    this.setState({
      showTaskListDialog: inVisible,
    });
  };

  setDialogTaskList(inTaskList: ITaskList = {title:""}): void {
    this.setState({
      dialogTaskList: inTaskList,
    });
  };

  async submitTaskListDialog(): Promise<void> {
    console.log(this.state.dialogTaskList);

    const worker: TaskLists.Worker = new TaskLists.Worker();

    // for editing existing task list
    if (this.state.dialogTaskList._id) {
    }
    // for creating and adding new task list
    else {
      const newTaskList: ITaskList = await worker.createTaskList(this.state.dialogTaskList);
      this.setState(state => ({
        taskLists: state.taskLists.concat(newTaskList),
        showTaskListDialog: false,
        dialogTaskList: {title:""},
      }));
    }

  }

  setShowTaskDialog(inVisible: boolean): void {
    this.setState({
      showTaskDialog: inVisible,
    });
  };

  setDialogTask(inTask: ITask = { title: "", description: "", } ): void {
    this.setState({
      dialogTask: inTask,
    });
  };

  async submitTaskDialog(): Promise<void> {
    console.log(this.state.dialogTask);

    const worker: Tasks.Worker = new Tasks.Worker();

    // for editing existing task
    // currently loops over tasks and replaces task with same id (could probably set it up to use an index)
    if (this.state.dialogTask._id) {
      const newTask: ITask = await worker.editTask(this.state.dialogTask._id, this.state.dialogTask);
      // set the new list of tasks
      this.setState(state => {
        const newTasks: ITask[] = state.tasks;
        for (let i: number = 0; i < newTasks.length; i++) {
          if (newTask._id === newTasks[i]._id) newTasks[i] = newTask;
        }
        return {
          tasks: newTasks,
          showTaskDialog: false,
          dialogTask: { title: "", description: "", },
        };
      });
    }
    // for creating and adding new task
    else {
      const newTask: ITask = await worker.createTask(this.state.dialogTask);
      if (this.state.selectedTaskList === null || newTask.taskList === this.state.selectedTaskList?._id) {
        this.setState(state => ({
          tasks: [newTask].concat(state.tasks),
          showTaskDialog: false,
          dialogTask: { title: "", description: "", },
        }));
      } else {
        this.setState({
          showTaskDialog: false,
          dialogTask: { title: "", description: "", },
        });
      }
    }

  };

  async setSelectedTaskList(inTaskList: ITaskList | null, isInit: boolean = false): Promise<void> {

    // if we are not initializing the App and the task list was not changed, then we don't need to grab any 
    // new tasks, so just set the currentView to "task-list-view" and selectedTask to null
    if (!isInit && (
      (inTaskList === null && this.state.selectedTaskList === null)
      ||
      (inTaskList !== null && this.state.selectedTaskList !== null && this.state.selectedTaskList._id === inTaskList._id)
    )) {
      this.setState({
        currentView: "task-list-view",
        selectedTask: null,
      });
    // else we need to grab some new tasks
    } else {

      // initiate list for tasks
      let tasks: any[];

      // if we are initializing the App of if task list has been changed to null then grab all tasks
      if (isInit || inTaskList === null) {
        const worker: Tasks.Worker = new Tasks.Worker();
        tasks = await worker.listTasks();
      // else only grab the tasks for the specified task list
      } else {
        const worker: TaskLists.Worker = new TaskLists.Worker();
        tasks = await worker.getTaskListTasks(String(inTaskList._id));
      }
  
      // update state with new tasks, new task list, and set currentView to "task-list-view"
      this.setState({
        selectedTaskList: inTaskList,
        tasks: tasks,
        currentView: "task-list-view",
        selectedTask: null,
      });

    }
  }

  setSelectedTask(inIndex: number | null): void {
    this.setState({
      currentView: "task-view",
      selectedTask: inIndex,
    });
  }

  setCurrentView(inView: string): void {
    if (inView !== this.state.currentView) {
      this.setState({
        currentView: inView,
      });
    }
  }

  addTaskList(inTaskList: ITaskList): void {
    const newTaskLists: ITaskList[] = this.state.taskLists.concat(inTaskList);
    this.setState({
      taskLists: newTaskLists,
    })
  }

  addTask(inTask: any): void {
    const newTasks: any[] = this.state.tasks.concat(inTask);
    this.setState({
      tasks: newTasks,
    })
  }

  // This might not be working properly
  componentDidMount() {
    async function getTaskLists(): Promise<ITaskList[]> {
      const worker: TaskLists.Worker = new TaskLists.Worker();
      const taskLists: ITaskList[] = await worker.listTasksLists();
      return taskLists;
    }
    getTaskLists().then((inTaskLists: ITaskList[]) => {
      inTaskLists.forEach((inTaskList) => {
        this.addTaskList(inTaskList);
      });
      this.setSelectedTaskList(null, true).then(() => {
        this.setShowLoadingScreen(false);
      })
    });
  }

  render() {
    return (
      <div className="ToDoApp">

        {/* <div className="LoadingScreen">
          <LoadingScreen showLoadingScreen={this.state.showLoadingScreen}/>
        </div> */}

        <BaseLayout 
          showTaskLists = {this.state.showTaskLists}
          setShowTaskLists = {this.setShowTaskLists}
          setShowTaskListDialog = {this.setShowTaskListDialog}
          setShowTaskDialog = {this.setShowTaskDialog}
          setDialogTask={this.setDialogTask}
          taskLists = {this.state.taskLists}
          selectedTaskList={this.state.selectedTaskList}
          setSelectedTaskList={this.setSelectedTaskList}
          tasks={this.state.tasks}
          selectedTask={this.state.selectedTask}
          setSelectedTask={this.setSelectedTask}
          currentView={this.state.currentView}
        />

        <TaskDialog 
          open={this.state.showTaskDialog}
          setOpen = {this.setShowTaskDialog}
          task={this.state.dialogTask}
          setTask={this.setDialogTask}
          submitTask={this.submitTaskDialog}
          taskLists={this.state.taskLists}
        />

        <TaskListDialog 
          open={this.state.showTaskListDialog}
          setOpen = {this.setShowTaskListDialog}
          taskList={this.state.dialogTaskList}
          setTaskList={this.setDialogTaskList}
          submitTaskList={this.submitTaskListDialog}
        />

      </div>
    );
  }
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------