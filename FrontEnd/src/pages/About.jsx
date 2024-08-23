import { Container, Typography, Box } from "@mui/material";

function About() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, color:'black' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          About This App
        </Typography>
        <Typography>
          This is a simple task management application built using React.js for
          the frontend and Django for the backend. The application allows users
          to add tasks, view task details, and manage the status of their tasks.
        </Typography>
      </Box>
    </Container>
  );
}

export default About;
