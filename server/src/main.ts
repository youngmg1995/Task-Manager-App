// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import express,
  { Express, NextFunction, Request, Response } from "express";

// local imports
import * as Tasks from "./Tasks";
import { ITask } from "./Tasks";


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

// list tasks
app.get("/tasks",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /tasks (1)");
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      const tasks: ITask[] = await Worker.listTasks();
      console.log("GET /tasks (1): OK", tasks);
      inResponse.json(tasks);
    } catch (inError) {
      console.log("GET /tasks (1): Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// get specific task
app.get("/tasks/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("GET /tasks/:id (2)", inRequest.params.id);
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      const task: ITask = await Worker.getTask(inRequest.params.id);
      console.log("GET /tasks/:id (2): OK", task);
      inResponse.json(task);
    } catch (inError) {
      console.log("GET /tasks/:id (2): Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// create new task
app.post("/tasks",
  async (inRequest: Request, inResponse: Response) => {
    console.log("POST /tasks (3)", inRequest.body);
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      const task: ITask = await Worker.createTask(inRequest.body);
      console.log("POST /tasks (3): OK", task);
      inResponse.json(task);
    } catch (inError) {
      console.log("POST /tasks (3): Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// edit existing task
app.put("/tasks/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("PUT /tasks (4)", inRequest.params.id, inRequest.body);
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      const task: ITask = await Worker.editTask(inRequest.params.id, inRequest.body);
      console.log("PUT /tasks (4): OK", task);
      inResponse.json(task);
    } catch (inError) {
      console.log("PUT /tasks (4): Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);

// delete existing task
app.delete("/tasks/:id",
  async (inRequest: Request, inResponse: Response) => {
    console.log("DELETE /tasks (5)", inRequest.body);
    try {
      const Worker: Tasks.Worker = new Tasks.Worker();
      await Worker.editTask(inRequest.params.id, inRequest.body);
      console.log("DELETE /tasks (5): OK");
      inResponse.send("Task Deleted");
    } catch (inError) {
      console.log("DELETE /tasks (5): Error", inError);
      inResponse.status(inError.status).send(inError.message);
    }
  }
);


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------- Start App ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

app.listen(port,
  () => {console.log(`ToDo Server listening on port ${port}.`)}  
);


// -----------------------------------------------------{---------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------ Fin ---------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------