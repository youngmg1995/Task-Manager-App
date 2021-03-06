// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import express,
  { Express, NextFunction, Request, Response } from "express";

// local imports
import * as Tasks from "./Tasks";
import { ITask } from "./Tasks";
import * as TaskLists from "./TaskLists";
import { ITaskList } from "./TaskLists";


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------- App Setup -----------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// initiate app
const app: Express = express();

// port to use
const port: number = 8000;

// middleware
app.use(express.json());
app.use(function(inRequest: Request, inResponse: Response, inNext: NextFunction) {
  inResponse.header("Access-Control-Allow-Origin", "*");
  inResponse.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
  inNext();
});


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------- REST Endpoints ---------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// list task lists
app.get("/tasklists",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /tasklists");
    try {
      const worker: TaskLists.Worker = new TaskLists.Worker();
      const taskLists: ITaskList[] = await worker.listTaskLists();
      console.log("GET /tasklists: OK", taskLists);
      inResponse.json(taskLists);
    } catch (inError) {
      console.log("GET /tasklists: Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// create new task list
app.post("/tasklists",
  async (inRequest: Request, inResponse: Response) => {
    console.log("POST /tasklists", inRequest.body);
    try {
      const worker: TaskLists.Worker = new TaskLists.Worker();
      const taskList: ITaskList = await worker.createTaskList(inRequest.body);
      console.log("POST /tasklists: OK", taskList);
      inResponse.json(taskList);
    } catch (inError) {
      console.log("POST /tasklists: Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// edit existing task list
app.put("/tasklists/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("PUT /tasklists/:id", inRequest.params.id, inRequest.body);
    try {
      const worker: TaskLists.Worker = new TaskLists.Worker();
      const taskList: ITaskList = await worker.editTaskList(inRequest.params.id, inRequest.body);
      console.log("PUT /tasklists/:id: OK", taskList);
      inResponse.json(taskList);
    } catch (inError) {
      console.log("PUT /tasklists/:id: Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// delete existing task list
app.delete("/tasklists/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("DELETE /tasklists/:id", inRequest.params.id);
    try {
      const worker: TaskLists.Worker = new TaskLists.Worker();
      await worker.deleteTaskList(inRequest.params.id);
      console.log("DELETE /tasklists/:id: OK");
      inResponse.send("Task List Deleted");
    } catch (inError) {
      console.log("DELETE /tasklists/:id: Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// list tasks for specific task list (setup to return type any[] in case certain task fields excluded in the future)
app.get("/tasklists/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /tasklist/:id", inRequest.params.id);
    try {
      const worker: Tasks.Worker = new Tasks.Worker();
      const tasks: ITask[] = await worker.getTaskList(inRequest.params.id);
      const finalTasks = filterTasks(tasks);
      console.log("GET /tasklist/:id: OK", finalTasks);
      inResponse.json(finalTasks);
    } catch (inError) {
      console.log("GET /tasklist/:id: Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// list all tasks (setup to return type any[] in case certain task fields excluded in the future)
app.get("/tasks",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /tasks ");
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      const tasks: ITask[] = await Worker.listTasks();
      const finalTasks = filterTasks(tasks);
      console.log("GET /tasks : OK", finalTasks);
      inResponse.json(finalTasks);
    } catch (inError) {
      console.log("GET /tasks : Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// list all urgent tasks (setup to return type any[] in case fiedls excluded in the future)
app.get("/tasks/urgent",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /tasks/urgent");
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      const queryParams: any = { urgent: true };
      const tasks: ITask[] = await Worker.queryTasks(queryParams);
      const finalTasks = filterTasks(tasks);
      console.log("GET /tasks/urgent : OK", finalTasks);
      inResponse.json(finalTasks);
    } catch (inError) {
      console.log("GET /tasks/urgent : Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// list all completed tasks (setup to return type any[] in case fiedls excluded in the future)
app.get("/tasks/completed",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /tasks/completed");
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      const queryParams: any = { completed: true };
      const tasks: ITask[] = await Worker.queryTasks(queryParams);
      const finalTasks = filterTasks(tasks);
      console.log("GET /tasks/completed : OK", finalTasks);
      inResponse.json(finalTasks);
    } catch (inError) {
      console.log("GET /tasks/completed : Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// get specific task
app.get("/tasks/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /tasks/:id ", inRequest.params.id);
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      const task: ITask = await Worker.getTask(inRequest.params.id);
      console.log("GET /tasks/:id : OK", task);
      inResponse.json(task);
    } catch (inError) {
      console.log("GET /tasks/:id : Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// create new task
app.post("/tasks",
  async (inRequest: Request, inResponse: Response) => {
    console.log("POST /tasks ", inRequest.body);
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      const task: ITask = await Worker.createTask(inRequest.body);
      console.log("POST /tasks : OK", task);
      inResponse.json(task);
    } catch (inError) {
      console.log("POST /tasks : Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// edit existing task by replacing with entirely new task
app.put("/tasks/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("PUT /tasks ", inRequest.params.id, inRequest.body);
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      const task: ITask = await Worker.editTask(inRequest.params.id, inRequest.body);
      console.log("PUT /tasks : OK", task);
      inResponse.json(task);
    } catch (inError) {
      console.log("PUT /tasks : Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// edit specific field of existing task by replacing with new value
app.put("/tasks/:id/:field",
  async (inRequest: Request, inResponse: Response) => {
    console.log(`PUT /tasks/${inRequest.params.id}/${inRequest.params.field}`, inRequest.body);
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      const task: ITask = await Worker.editTaskField(inRequest.params.id, inRequest.params.field, inRequest.body.value);
      console.log(`PUT /tasks/${inRequest.params.id}/${inRequest.params.field} : OK`, task);
      inResponse.json(task);
    } catch (inError) {
      console.log(`PUT /tasks/${inRequest.params.id}/${inRequest.params.field}`, inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// delete existing task
app.delete("/tasks/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("DELETE /tasks ", inRequest.body);
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      await Worker.deleteTask(inRequest.params.id);
      console.log("DELETE /tasks : OK");
      inResponse.send("Task Deleted");
    } catch (inError) {
      console.log("DELETE /tasks : Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// edit specific field for all tasks given in list of task ids by replacing with new value
app.put("/edit/tasks",
  async (inRequest: Request, inResponse: Response) => {
    console.log(`PUT /edit/tasks`, inRequest.body);
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      await Worker.editTasksField(inRequest.body.ids, inRequest.body.field, inRequest.body.value);
      console.log(`PUT /edit/tasks : OK`);
      inResponse.send("Tasks Updated");
    } catch (inError) {
      console.log(`PUT /edit/tasks`, inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// deletes all tasks specified in given list of task ids
app.delete("/delete/tasks",
  async (inRequest: Request, inResponse: Response) => {
    console.log("DELETE /delete/tasks ", inRequest.body);
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      await Worker.deleteTasks(inRequest.body.ids);
      console.log("DELETE /delete/tasks : OK");
      inResponse.send("Tasks Deleted");
    } catch (inError) {
      console.log("DELETE /delete/tasks  : Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);


// removes taskList field from all tasks in given list of task ids
app.put("/remove-tasklist/tasks",
  async (inRequest: Request, inResponse: Response) => {
    console.log(`PUT /remove-tasklist/tasks`, inRequest.body);
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      await Worker.removeTaskList(inRequest.body.ids);
      console.log(`PUT /remove-tasklist/tasks : OK`);
      inResponse.send("Tasks Updated");
    } catch (inError) {
      console.log(`PUT /remove-tasklist/tasks`, inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------- Helper Functions ---------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

function filterTasks(inTasks: ITask[]): any[] {
  return inTasks.map((inTask) => {
    // initiate filtered task as copy of original
    let outTask: any = Object.assign({},inTask);
    // delete all the fields we want to omit
    const omittedFields: string[] = [
    ];
    for (const field of omittedFields) {
      delete outTask[field];
    }
    return outTask;
  });
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------- Start App ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

app.listen(port,
  () => {console.log(`ToDo Server listening on port ${port}.`)}  
);


// -----------------------------------------------------{---------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Fin ---------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------