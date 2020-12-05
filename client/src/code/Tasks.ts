// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import axios, { AxiosResponse } from "axios";

// local imports
import { config } from "./config";

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
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------- Worker Class ----------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export class Worker {
  private serverAddress: string = config.serverAddress;

  // list tasks
  public async listTasks(): Promise<ITask[]> {
    console.log("Client - GET /tasks");
    const response: AxiosResponse = await axios.get(
      `${this.serverAddress}/tasks`
    );
    console.log("Client - GET /task: response = ", response);
    return response.data;
  }

  // get specific tasks
  public async getTask(inID: string): Promise<ITask> {
    console.log("Client - GET /tasks/:id", inID);
    const response: AxiosResponse = await axios.get(
      `${this.serverAddress}/tasks/${inID}`
    );
    console.log("Client - GET /task/:id: response = ", response);
    return response.data;
  }

  // create new task
  public async createTask(inTask: ITask): Promise<ITask> {
    console.log("Client - POST /tasks", inTask);
    const response: AxiosResponse = await axios.post(
      `${this.serverAddress}/tasks`,
      inTask,
    );
    console.log("Client - POST /tasks: response = ", response);
    return response.data;
  }

  // edit existing task
  public async editTask(inID: string, inTask: ITask): Promise<ITask> {
    console.log("Client - PUT /tasks", inID, inTask);
    const response: AxiosResponse = await axios.put(
      `${this.serverAddress}/tasks/${inID}`,
      inTask,
    );
    console.log("Client - PUT /tasks/:id: response = ", response);
    return response.data;
  }

  // delete existing task
  public async deleteTask(inID: string): Promise<void> {
    console.log("Client - DELETE /tasks/:id", inID);
    const response: AxiosResponse = await axios.delete(
      `${this.serverAddress}/tasks/${inID}`
    );
    console.log("Client - DELETE /task/:id: response = ", response);
  }

};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------