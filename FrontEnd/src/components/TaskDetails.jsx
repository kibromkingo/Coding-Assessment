/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { fetchTaskById } from "../api/taskApi";

function TaskDetails() {
  // Extract the task ID from the URL parameters
  const { id } = useParams();

  // State to store task details, loading state, and error message
  const [task, setTask] = useState(null); // Stores the details of the task
  const [loading, setLoading] = useState(true); // Indicates whether data is being fetched
  const [error, setError] = useState(null); // Stores error messages if fetching fails

  // Fetch task details when the component mounts or when the task ID changes
  useEffect(() => {
    const loadTask = async () => {
      setLoading(true); // Show loading spinner
      setError(null); // Clear any previous error messages

      try {
        // Fetch task details from the server
        const data = await fetchTaskById(id);
        setTask(data); // Store the fetched task details
      } catch (error) {
        setError("Failed to fetch task details."); // Show error message if fetching fails
      } finally {
        setLoading(false); // Hide loading spinner
      }
    };

    loadTask(); // Call the function to fetch task details
  }, [id]);

  // Show loading spinner while data is being fetched
  if (loading) return <CircularProgress />;

  // Show error message if fetching fails
  if (error)
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );

  // Render task details or a message if no task is found
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, color: "black", textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Task Details
        </Typography>
        {task ? (
          <div>
            {/* Display task details if available */}
            <Typography variant="h6">Name: {task.name}</Typography>
            <Typography>Description: {task.description}</Typography>
            <Typography>Status: {task.status}</Typography>
          </div>
        ) : (
          // Show message if no task is found
          <Typography>No task found.</Typography>
        )}
        {/* Button to navigate back to the home page */}
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Back to Home
          </Link>
        </Button>
      </Box>
    </Container>
  );
}

export default TaskDetails;
