// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import * as path from "path";
import Datastore from "nedb";

// local imports
// import * as Tasks from "./Tasks";
// import { ITask } from "./Tasks";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------- Task Interface ---------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ITaskList {
  _id?: number,
  title: string,
  icon: string,
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------- Task Worker ----------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export class Worker {

  // setup database for worker
  private db: Nedb;
  constructor() {
    this.db = new Datastore({
      filename: path.join(__dirname, "tasklists.db"),
      autoload: true
    });
  }

  // list TaskLists
  public listTaskLists(): Promise<ITaskList[]> {
    return new Promise((inResolve, inReject) => {
      this.db.find(
        {},
        {},
        (inError: Error | null, inDocs: ITaskList[]) => {
          if (inError) {
            console.log("TaskLists.Worker.listTaskLists(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error"});
          } else {
            console.log("TaskLists.Worker.listTaskLists(): OK", inDocs);
            inResolve(inDocs);
          }
        }
      );
    });
  }

  // create new TaskList
  public createTaskList(inTaskList: ITaskList): Promise<ITaskList> {
    return new Promise((inResolve, inReject) => {
      this.db.insert(
        inTaskList,
        (inError: Error | null, inNewDoc: ITaskList) => {
          if (inError) {
            console.log("TaskLists.Worker.createTaskList(): Error", inError);
            inReject({ status: 500, message: "Internal Sever Error" });
          } else {
            console.log("TaskLists.Worker.createTaskList(): OK", inNewDoc);
            inResolve(inNewDoc);
          }
        }
      )
    })
  }

  // edit existing TaskList
  public editTaskList(inID: string, inTaskList: ITaskList): Promise<ITaskList> {
    return new Promise((inResolve, inReject) => {
      this.db.update(
        { _id: inID },
        inTaskList,
        {returnUpdatedDocs : true},
        (inError: Error | null, inNumUpdated: number, inNewDoc: ITaskList) => {
          if (inError) {
            console.log("TaskLists.Worker.editTaskList(): Error", inError);
            inReject({ status: 500, message: "Internal Sever Error" });
          } else if (inNumUpdated === 0) {
            console.log("TaskLists.Worker.editTaskList(): Error", "Task Not Found");
            inReject({ status: 404, message: "Task Not Found" });
          } else {
            console.log("TaskLists.Worker.editTaskList(): OK", inNewDoc);
            inResolve(inNewDoc);
          }
        }
      )
    })
  }

  // delete TaskList
  public deleteTaskList(inID: string): Promise<void> {
    return new Promise((inResolve, inReject) => {
      this.db.remove(
        { _id: inID },
        {},
        (inError: Error | null, inNumRemoved: number) => {
          if (inError) {
            console.log("TaskLists.Worker.deleteTaskList(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error" });
          } else {
            console.log("TaskLists.Worker.deleteTaskList(): OK");
            inResolve();
          }
        }
      );
    });
  }

};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Fin ---------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------