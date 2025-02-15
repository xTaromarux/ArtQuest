// services/TaskService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tasks';

const TaskService = {
  getTasks: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  createTask: async (task: any) => {
    const response = await axios.post(API_URL, task);
    return response.data;
  }
};

export default TaskService;
