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
  taskList?: number,
  urgent: boolean,
  completed: boolean,
  dueDate?: string,
  dueTime?: string,
  description: string,
};

export function filterTask(inTask: ITask): any {
  // initiate filtered task as copy of original
  let outTask: any = Object.assign({},inTask);
  // delete all the fields we want to omit
  const omittedFields: string[] = [
  ];
  for (const field of omittedFields) {
    delete outTask[field];
  }
  return outTask;
}


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------- Worker Class ----------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------

export class Worker {
  private serverAddress: string = config.serverAddress;

  // list tasks
  public async listTasks(): Promise<any[]> {
    console.log("Client - GET /tasks");
    const response: AxiosResponse = await axios.get(
      `${this.serverAddress}/tasks`
    );
    console.log("Client - GET /task: response = ", response);
    return response.data;
  }

  // list all urgent tasks
  public async listUrgentTasks(): Promise<any[]> {
    console.log("Client - GET /tasks/urgent");
    const response: AxiosResponse = await axios.get(
      `${this.serverAddress}/tasks/urgent`,
    );
    console.log("Client - GET /tasks/urgent: response = ", response);
    return response.data;
  }

  // list all completed tasks
  public async listCompletedTasks(): Promise<any[]> {
    console.log("Client - GET /tasks/completed");
    const response: AxiosResponse = await axios.get(
      `${this.serverAddress}/tasks/completed`,
    );
    console.log("Client - GET /tasks/completed: response = ", response);
    return response.data;
  }

  // get specific tasks
  public async getTask(inID: number): Promise<ITask> {
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

  // edit existing task using completely new task
  public async editTask(inID: number, inTask: ITask): Promise<ITask> {
    console.log("Client - PUT /tasks", inID, inTask);
    const response: AxiosResponse = await axios.put(
      `${this.serverAddress}/tasks/${inID}`,
      inTask,
    );
    console.log("Client - PUT /tasks/:id: response = ", response);
    return response.data;
  }

  // edit specific field of existing task using new value
  public async editTaskField(inID: number, inField: string, inValue: any): Promise<ITask> {
    console.log(`Client - PUT /tasks/${inID}/${inField}`, inValue);
    const response: AxiosResponse = await axios.put(
      `${this.serverAddress}/tasks/${inID}/${inField}`,
      {value: inValue},
    );
    console.log("Client - PUT /tasks/:id/:field: response = ", response);
    return response.data;
  }

  // delete existing task
  public async deleteTask(inID: number): Promise<void> {
    console.log("Client - DELETE /tasks/:id", inID);
    const response: AxiosResponse = await axios.delete(
      `${this.serverAddress}/tasks/${inID}`
    );
    console.log("Client - DELETE /task/:id: response = ", response);
  }

  // edit specific field for list of tasks using new value
  public async editTasksField(inIDs: number[], inField: string, inValue: any): Promise<void> {
    console.log(`Client - PUT /edit/tasks`, inIDs, inField, inValue);
    const response: AxiosResponse = await axios.put(
      `${this.serverAddress}/edit/tasks`,
      {
        ids: inIDs,
        field: inField,
        value: inValue,
      },
    );
    console.log("Client - PUT /edit/tasks: response = ", response);
  }

  // delete each task in list of task ids
  public async deleteTasks(inIDList: number[]): Promise<void> {
    console.log("Client - DELETE /delete/tasks", inIDList);
    const response: AxiosResponse = await axios.delete(
      `${this.serverAddress}/delete/tasks`,
      { 
        data: { ids: inIDList },
      },
    );
    console.log("Client - DELETE /delete/tasks: response = ", response);
  }

  // remove taskList field for each task in list of task ids
  public async removeTaskTaskList(inIDList: number[]): Promise<void> {
    console.log(`Client - PUT /remove-tasklist/tasks`, inIDList);
    const response: AxiosResponse = await axios.put(
      `${this.serverAddress}/remove-tasklist/tasks`,
      {
        ids: inIDList,
      },
    );
    console.log("Client - PUT /remove-tasklist/tasks: response = ", response);
  }

};


// --------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Fin --------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------