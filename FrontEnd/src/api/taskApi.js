const API_URL = "http://localhost:8000/api/tasks"; 

// Fetch all tasks
export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
};

// Fetch a single task by ID
export const fetchTaskById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }
  return response.json();
};

// Create a new task
export const createTask = async (taskData) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error("Failed to create task");
  }
  return response.json();
};

// Update an existing task by ID
export const updateTask = async (id, taskData) => {
  const response = await fetch(`${API_URL}/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  return response.json();
};

// Delete a task by ID
export const deleteTask = async (id) => {
  const response = await fetch(`${API_URL}/${id}/`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
};
