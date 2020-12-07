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
// import * as Tasks from "./Tasks";
// import { ITask } from "./Tasks";
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
  taskLists: ITaskList[],
};

// actual component
export default class ToDoApp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showLoadingScreen: true,
      showTaskLists: false,
      taskLists: [],
    };

    this.setShowLoadingScreen = this.setShowLoadingScreen.bind(this);
    this.setShowTaskLists = this.setShowTaskLists.bind(this);
    this.addTaskList = this.addTaskList.bind(this);
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

  addTaskList(inTaskList: ITaskList) {
    const newTaskLists: ITaskList[] = this.state.taskLists.slice(0);
    newTaskLists.push(inTaskList);
    this.setState({
      taskLists: newTaskLists,
    })
  }

  componentDidMount() {
    async function getTasks(): Promise<ITaskList[]> {
      const taskListsWorker: TaskLists.Worker = new TaskLists.Worker();
      const taskLists: ITaskList[] = await taskListsWorker.listTasksLists();
      return taskLists;
    };
    getTasks()
      .then((inTaskLists: ITaskList[]) => {
        inTaskLists.forEach((inTaskList: ITaskList) => {
          this.addTaskList(inTaskList);
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
            taskLists = {this.state.taskLists}
          />
        </div>

      </div>
    );
  }
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------