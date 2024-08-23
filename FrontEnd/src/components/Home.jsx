/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Alert,
} from "@mui/material";
import TaskList from "../components/TaskList";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/taskApi";

function Home() {
  // State to manage tasks and form inputs
  const [tasks, setTasks] = useState([]); // List of tasks
  const [taskName, setTaskName] = useState(""); // Task name input
  const [taskDescription, setTaskDescription] = useState(""); // Task description input
  const [taskStatus, setTaskStatus] = useState("Pending"); // Status of the task
  const [statusOptions] = useState(["Pending", "In Progress", "Completed"]); // Available status options
  const [editingTaskId, setEditingTaskId] = useState(null); // ID of the task being edited
  const [loading, setLoading] = useState(false); // Loading spinner state
  const [successMessage, setSuccessMessage] = useState(""); // Success message to show
  const [errorMessage, setErrorMessage] = useState(""); // Error message to show

  // Fetch tasks from the server when the component mounts
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true); // Show loading spinner
      setSuccessMessage(""); // Clear any previous success messages
      setErrorMessage(""); // Clear any previous error messages

      try {
        const data = await fetchTasks(); // Get tasks from the server
        setTasks(data); // Update state with fetched tasks
      } catch (error) {
        setErrorMessage("Failed to load tasks."); // Show error message if fetching fails
      } finally {
        setLoading(false); // Hide loading spinner
      }
    };

    loadTasks(); // Call the function to fetch tasks
  }, []);

  // Handle adding or updating a task
  const handleAddOrUpdateTask = async () => {
    if (taskName.trim()) {
      setLoading(true); // Show loading spinner
      setSuccessMessage(""); // Clear any previous success messages
      setErrorMessage(""); // Clear any previous error messages

      try {
        if (editingTaskId) {
          // Update an existing task
          await updateTask(editingTaskId, {
            name: taskName,
            description: taskDescription,
            status: taskStatus,
          });
          setTasks(
            tasks.map((task) =>
              task.id === editingTaskId
                ? {
                    ...task,
                    name: taskName,
                    description: taskDescription,
                    status: taskStatus,
                  }
                : task
            )
          );
          setSuccessMessage("Task updated successfully!"); // Show success message
        } else {
          // Add a new task
          const newTask = await createTask({
            name: taskName,
            description: taskDescription,
            status: taskStatus,
          });
          setTasks([...tasks, newTask]); // Add new task to the list
          setSuccessMessage("Task added successfully!"); // Show success message
        }
        resetForm(); // Clear the form inputs
      } catch (error) {
        setErrorMessage(
          editingTaskId ? "Failed to update task." : "Failed to add task." // Show error message if adding/updating fails
        );
      } finally {
        setLoading(false); // Hide loading spinner
      }
    } else {
      setErrorMessage("Task name is required."); // Show error message if task name is empty
    }
  };

  // Populate the form with task details for editing
  const handleEditTask = (task) => {
    setEditingTaskId(task.id); // Set the task ID being edited
    setTaskName(task.name); // Populate task name
    setTaskDescription(task.description); // Populate task description
    setTaskStatus(task.status); // Populate task status
  };

  // Handle deleting a task
  const handleDeleteTask = async (id) => {
    setLoading(true); // Show loading spinner
    setSuccessMessage(""); // Clear any previous success messages
    setErrorMessage(""); // Clear any previous error messages

    try {
      await deleteTask(id); // Delete the task from the server
      setTasks(tasks.filter((task) => task.id !== id)); // Remove the deleted task from the list
      setSuccessMessage("Task deleted successfully!"); // Show success message
      resetForm(); // Clear the form inputs
    } catch (error) {
      setErrorMessage("Failed to delete task."); // Show error message if deleting fails
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Reset the form to default values
  const resetForm = () => {
    setTaskName(""); // Clear task name input
    setTaskDescription(""); // Clear task description input
    setTaskStatus("Pending"); // Reset task status to default
    setEditingTaskId(null); // Clear the task ID being edited
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography color="black" variant="h4" component="h1" gutterBottom>
        Task Management Dashboard
      </Typography>

      {/* Show loading spinner if tasks are being loaded */}
      {loading && <CircularProgress />}
      {/* Show success message if any */}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {/* Show error message if any */}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      {/* Task name input */}
      <TextField
        label="Task Name"
        variant="outlined"
        fullWidth
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        sx={{ mb: 2 }}
        disabled={loading} // Disable input while loading
      />
      {/* Task description input */}
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        sx={{ mb: 2 }}
        disabled={loading} // Disable input while loading
      />
      {/* Task status selection */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
          label="Status"
          disabled={loading} // Disable select while loading
        >
          {statusOptions.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Add or update task button */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleAddOrUpdateTask}
        disabled={loading} // Disable button while loading
      >
        {loading ? "Processing..." : editingTaskId ? "Update Task" : "Add Task"}
      </Button>

      {/* Task list component */}
      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        loading={loading}
      />
    </Box>
  );
}

export default Home;
