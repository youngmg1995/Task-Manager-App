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
import {
  defaultTask,
  defaultTaskList,
  defaultTaskLists,
} from "./defaultSettings";
import * as Tasks from "./Tasks";
import { ITask, filterTask } from "./Tasks";
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
  selectedTaskList: number | string,
  tasks: any[],
  selectedTasks: Set<number>,
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
      dialogTaskList: defaultTaskList,
      showTaskDialog: false,
      dialogTask: defaultTask,
      taskLists: [],
      selectedTaskList: "all",
      tasks: [],
      selectedTasks: new Set(),
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

    // for editing a specific field of a task
    this.editTaskField = this.editTaskField.bind(this);

    // for making changes to the selectedTasks
    this.editSelectedTasks = this.editSelectedTasks.bind(this);

    // for deleting a task
    this.deleteTask = this.deleteTask.bind(this);

    // for selecting tasks to edit while in the task list view
    this.setSelectedTasks = this.setSelectedTasks.bind(this);

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

  setDialogTaskList(inTaskList: ITaskList = defaultTaskList): void {
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
        dialogTaskList: defaultTaskList,
      }));
    }

  }

  async setShowTaskDialog(inVisible: boolean, inTaskID?: number): Promise<void> {
    // if opening the dialog then we need to initiate the task to be viewed
    if (inVisible === true) {
      let dialogTask: ITask;
      if (inTaskID) {
        const worker: Tasks.Worker = new Tasks.Worker();
        dialogTask = await worker.getTask(inTaskID);
      } else {
        dialogTask = defaultTask;
        if (defaultTaskLists[this.state.selectedTaskList] === undefined) {
          Object.assign(dialogTask, {taskList: this.state.selectedTaskList});
        }
      }
      this.setState({
        showTaskDialog: inVisible,
        dialogTask: dialogTask,
      })
    // else just close it
    } else {
      this.setState({
        showTaskDialog: inVisible,
      });
    }
  };

  setDialogTask(inTask: ITask = defaultTask ): void {
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
      const filteredTask: any = filterTask(newTask);
      // set the new list of tasks
      this.setState(state => {
        const newTasks: any[] = state.tasks;
        for (let i: number = 0; i < newTasks.length; i++) {
          if (filteredTask._id === newTasks[i]._id) newTasks[i] = filteredTask;
        }
        return {
          tasks: newTasks,
        };
      });
    }
    // for creating and adding new task
    else {
      const newTask: ITask = await worker.createTask(this.state.dialogTask);
      const filteredTask: any = filterTask(newTask);
      // add task to state.tasks if it should be in the selected task list
      if (this.state.selectedTaskList === "all" || newTask.taskList === this.state.selectedTaskList) {
        this.setState(state => ({
          tasks: [filteredTask].concat(state.tasks),
        }));
      }
    }

  };

  async setSelectedTaskList(inTaskListID: number | string, isInit: boolean = false): Promise<void> {

    // if we are not initializing the App and the task list was not changed, then we don't need to grab any 
    // new tasks, so just set the currentView to "task-list-view" and selectedTask to null
    // if (!isInit && inTaskListID === this.state.selectedTaskList) {
    // actually gonna make it update even if its the same task list (probably should remove this conditional code below then)
    if (false) {
      this.setState({
        currentView: "task-list-view",
        selectedTask: null,
        selectedTasks: new Set(),
      });
    // else we need to grab some new tasks
    } else {

      // initiate list for tasks
      let tasks: any[];

      // if we are initializing the App of if task list has been changed to "all" (for all tasks) then grab all tasks
      if (isInit || inTaskListID === "all") {
        const worker: Tasks.Worker = new Tasks.Worker();
        tasks = await worker.listTasks();
      // else only grab the tasks for the specified default task list (such as "Urgent" or "Completed" which aren't actual task lists)
      // and use their own API
      } else if (defaultTaskLists[inTaskListID]) {
        const worker: Tasks.Worker = new Tasks.Worker();
        if (inTaskListID === "urgent") {
          tasks = await worker.listUrgentTasks();
        } else if (inTaskListID === "completed") {
          tasks = await worker.listCompletedTasks();
        } else {
          tasks = await worker.listTasks();
        }
      // else only grab the tasks for the specified task list
      } else {
        const worker: TaskLists.Worker = new TaskLists.Worker();
        tasks = await worker.getTaskListTasks(String(inTaskListID));
      }
  
      // update state with new tasks, new task list, no selectedTask(s), and set currentView to "task-list-view"
      this.setState({
        selectedTaskList: inTaskListID,
        tasks: tasks,
        currentView: "task-list-view",
        selectedTask: null,
        selectedTasks: new Set(),
      });

    }
  }
  
  async deleteTask(inTaskID: number): Promise<void> {

    // use API to delete task on back-end
    const worker: Tasks.Worker = new Tasks.Worker();
    await worker.deleteTask(inTaskID);
    console.log(inTaskID);

    // remove task from tasks if included (simply loops over tasks and looks for matching id)
    this.setState(state => {
      let newTasks: any[] = state.tasks.slice(0);
      for (let i: number = 0; i < newTasks.length; i++) {
        if (inTaskID === newTasks[i]._id) {
          newTasks = newTasks.slice(0,i).concat(newTasks.slice(i+1));
        }
      }
      return {
        tasks: newTasks,
      };
    });

  }

  async editTaskField(inTaskID: number, inField: string, inValue: any): Promise<void> {
    // edit task on back-end using API
    const worker: Tasks.Worker = new Tasks.Worker();
    const editedTask: ITask = await worker.editTaskField(inTaskID, inField, inValue);

    // replace old task with new one in tasks (just looks through array and searches for matching id)
    this.setState(state => {
      let editedTasks: any[] = state.tasks.slice(0);
      for (let i: number = 0; i < editedTasks.length; i++) {
        if (editedTask._id === editedTasks[i]._id) {
          editedTasks[i] = filterTask(editedTask);
        }
      }
      return {
        tasks: editedTasks,
      };
    });
  }

  setSelectedTasks(inAction: string, inTaskID?: number): void {

    if (inAction === "all") {
      this.setState(state => {
        let newSelectedTasks: Set<number> = new Set(state.tasks.map((inTask) => (inTask._id)));
        return {
          selectedTasks: newSelectedTasks,
        };
      });
    } else if (inAction === "none") {
      this.setState({
        selectedTasks: new Set(),
      });
    } else if (inAction === "urgent") {
      this.setState(state => {
        let newSelectedTasks: Set<number> = new Set(state.tasks.filter((inTask) => (inTask.urgent === true)).map((inTask) => (inTask._id)));
        return {
          selectedTasks: newSelectedTasks,
        };
      });
    } else if (inAction === "not urgent") {
      this.setState(state => {
        let newSelectedTasks: Set<number> = new Set(state.tasks.filter((inTask) => (inTask.urgent === false)).map((inTask) => (inTask._id)));
        return {
          selectedTasks: newSelectedTasks,
        };
      });
    } else if (inAction === "completed") {
      this.setState(state => {
        let newSelectedTasks: Set<number> = new Set(state.tasks.filter((inTask) => (inTask.completed === true)).map((inTask) => (inTask._id)));
        return {
          selectedTasks: newSelectedTasks,
        };
      });
    } else if (inAction === "not completed") {
      this.setState(state => {
        let newSelectedTasks: Set<number> = new Set(state.tasks.filter((inTask) => (inTask.completed === false)).map((inTask) => (inTask._id)));
        return {
          selectedTasks: newSelectedTasks,
        };
      });
    } else if (inAction === "add" && inTaskID) {
      this.setState(state => {
        let newSelectedTasks: Set<number> = state.selectedTasks;
        newSelectedTasks.add(inTaskID);
        return {
          selectedTasks: newSelectedTasks,
        };
      });
    } else if (inAction === "remove" && inTaskID) {
      this.setState(state => {
        let newSelectedTasks: Set<number> = state.selectedTasks;
        newSelectedTasks.delete(inTaskID);
        return {
          selectedTasks: newSelectedTasks,
        };
      });
    }
  }

  async editSelectedTasks(inAction: string, inTaskListID?: number): Promise<void> {

    // initialize worker for calling API
    const worker: Tasks.Worker = new Tasks.Worker();

    if (inAction === "delete") {

      // update back-end tasks using API
      await worker.deleteTasks(Array.from(this.state.selectedTasks));
      // update front-end tasks and selectedTasks in state
      this.setState(state => ({
        tasks: state.tasks.filter( inTask => !state.selectedTasks.has(inTask._id) ),
        selectedTasks: new Set(),
      }));

    } else if (inAction === "move to" ) {

      // if taskListID specified then move selected tasks to specified taskList
      if (inTaskListID) {
        // update back-end tasks using API
        await worker.editTasksField(Array.from(this.state.selectedTasks), "taskList", inTaskListID);
      }
      else {
        await worker.removeTaskTaskList(Array.from(this.state.selectedTasks));
      }
      
      // update front-end tasks and selectedTasks in state
      // unless selected taskList is one of the defaults or the same as the given taskList (since then the tasks should still be showing)
      if (!defaultTaskLists[this.state.selectedTaskList] && this.state.selectedTaskList !== inTaskListID) {
        this.setState(state => ({
          tasks: state.tasks.filter( inTask => !state.selectedTasks.has(inTask._id) ),
          selectedTasks: new Set(),
        }));
      }

    } else {

      // initiate field and value
      let field: string;
      let value: boolean;
      let check: boolean;

      if (inAction === "mark not urgent") {
        field = "urgent";
        value = false; 
        check = true;
      } else if (inAction === "mark urgent") {
        field = "urgent";
        value = true; 
        check = true;
      } else if (inAction === "mark incomplete") {
        field = "completed";
        value = false; 
        check = true;
      } else if (inAction === "mark completed") {
        field = "completed";
        value = true; 
        check = true;
      } else {
        field = "";
        value = false; 
        check = false;
      }

      if ( check ) {
        // update back-end tasks using API
        await worker.editTasksField(Array.from(this.state.selectedTasks), field, value);
        // update front-end tasks and selectedTasks in state
        this.setState(state => ({
          tasks: state.tasks.map((inTask) => {
            if (state.selectedTasks.has(inTask._id)) {
              return Object.assign(
                {}, 
                inTask, 
                { [field]: value },
              );
            } else return inTask;
          }),
        }));
      }
      
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
      this.setSelectedTaskList("all", true).then(() => {
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
          taskLists = {this.state.taskLists}
          selectedTaskList={this.state.selectedTaskList}
          setSelectedTaskList={this.setSelectedTaskList}
          tasks={this.state.tasks}
          selectedTasks={this.state.selectedTasks}
          setSelectedTasks={this.setSelectedTasks}
          selectedTask={this.state.selectedTask}
          setSelectedTask={this.setSelectedTask}
          currentView={this.state.currentView}
          deleteTask={this.deleteTask}
          editTaskField={this.editTaskField}
          editSelectedTasks={this.editSelectedTasks}
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