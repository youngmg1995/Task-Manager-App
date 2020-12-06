// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import React from "react";

// local imports
import {
  // LoadingScreen,
  BaseLayout,
} from "./components";
import * as Tasks from "./Tasks";
import { ITask } from "./Tasks";



// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------ ToDoApp Component -------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// props and state types
type Props = {
};
type State = {
  showLoadingScreen: boolean,
  showTaskLists: boolean,
  taskList: ITask[],
};

// actual component
export default class ToDoApp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showLoadingScreen: true,
      showTaskLists: false,
      taskList: [],
    };

    this.setShowLoadingScreen = this.setShowLoadingScreen.bind(this);
    this.setShowTaskLists = this.setShowTaskLists.bind(this);
    this.addTaskToList = this.addTaskToList.bind(this);
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

  addTaskToList(inTask: ITask) {
    const newTaskList: ITask[] = this.state.taskList.slice(0);
    newTaskList.push(inTask);
    this.setState({
      taskList: newTaskList,
    })
  }

  componentDidMount() {
    async function getTasks(): Promise<ITask[]> {
      const tasksWorker: Tasks.Worker = new Tasks.Worker();
      const tasks: ITask[] = await tasksWorker.listTasks();
      return tasks;
    };
    getTasks()
      .then((tasks: ITask[]) => {
        tasks.forEach((task: ITask) => {
          this.addTaskToList(task);
        })
      })
      .then(() => {
        this.setShowLoadingScreen(false);
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
          />
        </div>

      </div>
    );
  }
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------