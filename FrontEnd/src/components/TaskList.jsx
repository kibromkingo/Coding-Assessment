/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <Box>
      {/* Iterate over the tasks and render each one */}
      {tasks.map((task) => (
        <Box
          key={task.id} // Unique key for each task
          sx={{
            mb: 2,
            mt: 5,
            p: 2,
            border: "1px solid #ddd",
            color: "black",
            borderRadius: 1,
            textAlign: "center",
          }}
        >
          {/* Display task name */}
          <Typography variant="h6">{task.name}</Typography>
          {/* Display task description */}
          <Typography>Description: {task.description}</Typography>
          {/* Display task status */}
          <Typography>Status: {task.status}</Typography>
          {/* Link to view task details */}
          <Link to={`/task/${task.id}`}>View Details</Link>
          <div>
            {/* Button to edit the task */}
            <IconButton onClick={() => onEdit(task)} color="primary">
              <EditIcon />
            </IconButton>
            {/* Button to delete the task */}
            <IconButton onClick={() => onDelete(task.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </div>
        </Box>
      ))}
    </Box>
  );
}

export default TaskList;
