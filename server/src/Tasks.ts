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
  category?: string,
  dueDate?: string,
  dueTime?: string,
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
  }

  // list tasks
  public listTasks(): Promise<ITask[]> {
    return new Promise((inResolve, inReject) => {
      this.db.find({}, (inError: Error, inDocs: ITask[]) => {
        if (inError) {
          console.log("Tasks.Worker.listTasks(): Error", inError);
          inReject({ status: 500, message: "Internal Server Error"});
        } else {
          console.log("Tasks.Worker.listTasks(): OK", inDocs);
          inResolve(inDocs);
        }
      });
    });
  };

  // get specific task
  public getTask(inID: string): Promise<ITask> {
    return new Promise((inResolve, inReject) => {
      this.db.find(
        { _id: inID }, 
        (inError: Error, inDocs: ITask[]) => {
          if (inError) {
            console.log("Tasks.Worker.getTask(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error"});
          } else if (inDocs.length === 0) {
            console.log("Tasks.Worker.getTask(): Error", "Task Not Found");
            inReject({ status: 404, message: "Task Not Found"});
          } else {
            console.log("Tasks.Worker.getTask(): OK", inDocs);
            inResolve(inDocs[0]);
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

  // edit existing task
  public editTask(inID: string, inTask: ITask): Promise<ITask> {
    return new Promise((inResolve, inReject) => {
      this.db.update(
        { _id: inID },
        inTask,
        {upsert: true},
        (inError: Error | null, inNumEdited: number, inNewDoc: ITask) => {
          if (inError) {
            console.log("Tasks.Worker.editTack(): Error", inError);
            inReject({ status: 500, message: "Internal Server Error"});
          } else if (inNumEdited === 0) {
            console.log("Tasks.Worker.editTack(): Error", "Task Not Found");
            inReject({ status: 404, message: "Task Not Found"});
          } else {
            console.log("Tasks.Worker.editTack(): OK", inNewDoc);
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

}



// --------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------- Start App ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------



// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Fin ---------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------