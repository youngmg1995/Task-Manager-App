// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Imports ------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

// node modules
import axios, { AxiosResponse } from "axios";

// local imports
import { config } from "./config";
import { ITask } from "./Tasks";

// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------- Task Interface ---------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export interface ITaskList {
  _id?: number,
  title: string,
};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------- Worker Class ----------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export class Worker {
  private serverAddress: string = config.serverAddress;

  // list tasks lists
  public async listTasksLists(): Promise<ITaskList[]> {
    console.log("Client - GET /tasklists");
    const response: AxiosResponse = await axios.get(
      `${this.serverAddress}/tasklists`
    );
    console.log("Client - GET /task: response = ", response);
    return response.data;
  }

  // create new task list
  public async createTaskList(inTaskList: ITaskList): Promise<ITaskList> {
    console.log("Client - POST /tasks", inTaskList);
    const response: AxiosResponse = await axios.post(
      `${this.serverAddress}/tasklists`,
      inTaskList,
    );
    console.log("Client - POST /tasklists: response = ", response);
    return response.data;
  }

  // edit existing task list
  public async editTaskList(inID: string, inTaskList: ITaskList): Promise<ITaskList> {
    console.log("Client - PUT /tasklists/:id", inID, inTaskList);
    const response: AxiosResponse = await axios.put(
      `${this.serverAddress}/tasks/${inID}`,
      inTaskList,
    );
    console.log("Client - PUT /tasklists/:id: response = ", response);
    return response.data;
  }

  // delete existing task list
  public async deleteTaskList(inID: string): Promise<void> {
    console.log("Client - DELETE /tasklists/:id", inID);
    const response: AxiosResponse = await axios.delete(
      `${this.serverAddress}/tasklists/${inID}`
    );
    console.log("Client - DELETE /tasklists/:id: response = ", response);
  }

  // get tasks for specific task list
  public async getTaskListTasks(inID: string): Promise<ITask> {
    console.log("Client - GET /tasklists/:id", inID);
    const response: AxiosResponse = await axios.get(
      `${this.serverAddress}/tasklists/${inID}`
    );
    console.log("Client - GET /tasklists/:id: response = ", response);
    return response.data;
  }

};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------