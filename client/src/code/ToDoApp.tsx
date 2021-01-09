// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React from "react";

// local imports
import {
  // LoadingScreen,
  BaseLayout,
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
  taskLists: ITaskList[],
  selectedTaskList: ITaskList | null,
  tasks: any[],
  selectedTask: ITask | null,
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
      taskLists: [],
      selectedTaskList: null,
      tasks: [],
      selectedTask: null,
    };

    this.setShowLoadingScreen = this.setShowLoadingScreen.bind(this);
    this.setShowTaskLists = this.setShowTaskLists.bind(this);
    this.setShowTaskListDialog = this.setShowTaskListDialog.bind(this);
    this.setDialogTaskList = this.setDialogTaskList.bind(this);
    this.submitTaskListDialog = this.submitTaskListDialog.bind(this);
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

  async setSelectedTaskList(inTaskList: ITaskList | null, isInit: boolean = false): Promise<void> {
    if (inTaskList === null) {
      if (this.state.selectedTaskList !== null || isInit) {
        console.log("Setting new task list to null")
        const worker: Tasks.Worker = new Tasks.Worker();
        const tasks: any[] = await worker.listTasks();
        this.setState({
          selectedTaskList: inTaskList,
          tasks: tasks,
        });
      } 
    } else {
      if (this.state.selectedTaskList === null 
        || (this.state.selectedTaskList !== null && this.state.selectedTaskList._id !== inTaskList._id)
      ) {
        console.log("Setting new task list")
        const worker: TaskLists.Worker = new TaskLists.Worker();
        const tasks: any[] = await worker.getTaskListTasks(String(inTaskList._id));
        this.setState({
          selectedTaskList: inTaskList,
          tasks: tasks,
        });
      }
    }
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

        <div className="BaseLayout">
          <BaseLayout 
            showTaskLists = {this.state.showTaskLists}
            setShowTaskLists = {this.setShowTaskLists}
            setShowTaskListDialog = {this.setShowTaskListDialog}
            taskLists = {this.state.taskLists}
            selectedTaskList={this.state.selectedTaskList}
            setSelectedTaskList={this.setSelectedTaskList}
            tasks={this.state.tasks}
            selectedTask={this.state.selectedTask}
          />
        </div>

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