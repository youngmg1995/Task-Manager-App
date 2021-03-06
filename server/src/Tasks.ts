// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import * as path from "path";
import Datastore from "nedb";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------- Task Interface ---------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ITask {
  _id?: number,
  title: string,
  taskList?: number,
  urgent: boolean,
  completed: boolean,
  description: string,
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------- Task Worker ----------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export class Worker {

  // setup database for worker
  private db: Nedb;
  constructor() {
    this.db = new Datastore({
      filename: path.join(__dirname, "tasks.db"),
      autoload: true
    });
    // this.db.ensureIndex({ fieldName: "taskList" });
  }

  // list tasks
  public listTasks(): Promise<ITask[]> {
    return new Promise((inResolve, inReject) => {
      this.db.find(
        {},
        {},
        (inError: Error | null, inDocs: ITask[]) => {
          if (inError) {
            console.log("Tasks.Worker.listTasks(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error"});
          } else {
            console.log("Tasks.Worker.listTasks(): OK", inDocs);
            inResolve(inDocs);
          }
        }
      );
    });
  };

  // get specific task
  public getTask(inID: string): Promise<ITask> {
    return new Promise((inResolve, inReject) => {
      this.db.findOne(
        { _id: inID },
        {},
        (inError: Error | null, inDoc: ITask) => {
          if (inError) {
            console.log("Tasks.Worker.getTask(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error"});
          } else if (inDoc === null) {
            console.log("Tasks.Worker.getTask(): Error", "Task Not Found");
            inReject({ status: 404, message: "Task Not Found"});
          } else {
            console.log("Tasks.Worker.getTask(): OK", inDoc);
            inResolve(inDoc);
          }
        }
      );
    });
  };

  // create new task
  public createTask(inTask: ITask): Promise<ITask> {
    return new Promise((inResolve, inReject) => {
      this.db.insert(
        inTask,
        (inError: Error | null, inNewDoc: ITask) => {
          if (inError) {
            console.log("Tasks.Worker.createTask(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error"});
          } else {
            console.log("Tasks.Worker.createTask(): OK", inNewDoc);
            inResolve(inNewDoc);
          }
        }
      );
    });
  };

  // edit existing task using an entirely new task
  public editTask(inID: string, inTask: ITask): Promise<ITask> {
    return new Promise((inResolve, inReject) => {
      this.db.update(
        { _id: inID },
        inTask,
        {returnUpdatedDocs : true},
        (inError: Error | null, inNumEdited: number, inNewDoc: ITask) => {
          if (inError) {
            console.log("Tasks.Worker.editTask(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error"});
          } else if (inNumEdited === 0) {
            console.log("Tasks.Worker.editTask(): Error", "Task Not Found");
            inReject({ status: 404, message: "Task Not Found"});
          } else {
            console.log("Tasks.Worker.editTask(): OK", inNewDoc);
            inResolve(inNewDoc);
          }
        }
      );
    });
  };

  // edit single field in existing task by setting to new value
  public editTaskField(inID: string, inField: string, inValue: any): Promise<ITask> {
    return new Promise((inResolve, inReject) => {
      this.db.update(
        { _id: inID },
        { $set: {[inField]: inValue}},
        {returnUpdatedDocs : true},
        (inError: Error | null, inNumEdited: number, inNewDoc: ITask) => {
          if (inError) {
            console.log("Tasks.Worker.editTaskField(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error"});
          } else if (inNumEdited === 0) {
            console.log("Tasks.Worker.editTaskField(): Error", "Task Not Found");
            inReject({ status: 404, message: "Task Not Found"});
          } else {
            console.log("Tasks.Worker.editTaskField(): OK", inNewDoc);
            inResolve(inNewDoc);
          }
        }
      );
    });
  };

  // delete existing task
  public deleteTask(inID: string): Promise<void> {
    return new Promise((inResolve, inReject) => {
      this.db.remove(
        { _id: inID },
        {},
        (inError: Error | null, inNumRemoved: number) => {
          if (inError) {
            console.log("Tasks.Worker.deleteTask(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error"});
          } else {
            console.log("Tasks.Worker.deleteTask(): OK");
            inResolve();
          }
        }
      );
    });
  };

  // list tasks for specific TaskList
  public getTaskList(inTaskListID: string): Promise<ITask[]> {
    return new Promise((inResolve, inReject) => {
      this.db.find(
        { taskList: inTaskListID },
        {},
        (inError: Error | null, inDocs: ITask[]) => {
          if (inError) {
            console.log("Tasks.Worker.getTaskList(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error" });
          } else {
            console.log("Tasks.Worker.getTaskList(): OK", inDocs);
            inResolve(inDocs);
          }
        }
      );
    });
  }

  // delete all tasks for a specific TaskList
  public deleteTaskList(inTaskListID: string): Promise<void> {
    return new Promise((inResolve, inReject) => {
      this.db.remove(
        { taskList: inTaskListID },
        {},
        (inError: Error | null, inNumRemoved: number) => {
          if (inError) {
            console.log("Tasks.Worker.deleteTaskList(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error" });
          } else {
            console.log("Tasks.Worker.deleteTaskList(): OK", inNumRemoved);
            inResolve();
          }
        }
      );
    });
  }

  // list tasks meeting the given query parameters
  public queryTasks(inQueryParams: any): Promise<ITask[]> {
    return new Promise((inResolve, inReject) => {
      this.db.find(
        inQueryParams,
        {},
        (inError: Error | null, inDocs: ITask[]) => {
          if (inError) {
            console.log("Tasks.Worker.queryTasks(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error" });
          } else {
            console.log("Tasks.Worker.queryTasks(): OK", inDocs);
            inResolve(inDocs);
          }
        }
      );
    });
  }

  // edit single field for list of tasks by prescribing the new value
  public editTasksField(inIDList: string[], inField: string, inValue: any): Promise<void> {
    return new Promise((inResolve, inReject) => {
      this.db.update(
        { _id: { $in: inIDList, } },
        { $set: {[inField]: inValue}},
        {multi : true},
        (inError: Error | null, inNumEdited: number) => {
          if (inError) {
            console.log("Tasks.Worker.editTasksField(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error"});
          } else if (inNumEdited !== inIDList.length) {
            console.log("Tasks.Worker.editTasksField(): Error", "Tasks Not Found");
            inReject({ status: 404, message: "Task Not Found"});
          } else {
            console.log("Tasks.Worker.editTasksField(): OK");
            inResolve();
          }
        }
      );
    });
  };

  // delete task for each task specified in given list of task ids
  public deleteTasks(inIDList: string[]): Promise<void> {
    return new Promise((inResolve, inReject) => {
      this.db.remove(
        { _id: { $in: inIDList, } },
        {multi : true},
        (inError: Error | null, inNumRemoved: number) => {
          if (inError) {
            console.log("Tasks.Worker.deleteTasks(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error"});
          } else {
            console.log("Tasks.Worker.deleteTasks(): OK");
            inResolve();
          }
        }
      );
    });
  };

  // remove tasklist field for each task specified in given list of task ids
  public removeTaskList(inIDList: string[]): Promise<void> {
    return new Promise((inResolve, inReject) => {
      this.db.update(
        { _id: { $in: inIDList, } },
        { $unset: { taskList: true } },
        {multi : true},
        (inError: Error | null, inNumEdited: number) => {
          if (inError) {
            console.log("Tasks.Worker.removeTaskList(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error"});
          } else if (inNumEdited !== inIDList.length) {
            console.log("Tasks.Worker.removeTaskList(): Error", "Tasks Not Found");
            inReject({ status: 404, message: "Task Not Found"});
          } else {
            console.log("Tasks.Worker.removeTaskList(): OK");
            inResolve();
          }
        }
      );
    });
  };

};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Fin ---------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------