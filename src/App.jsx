import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskPriority, setTaskPriority] = useState("low");
  const [editIndex, setEditIndex] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Task add
  const handleAddTask = () => {
    if (taskName.trim() !== "") {
      if (editIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = {
          name: taskName,
          status: "incomplete",
          priority: taskPriority,
        };
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([
          ...tasks,
          { name: taskName, status: "incomplete", priority: taskPriority },
        ]);
      }
      setTaskName("");
      setTaskPriority("low");
    }
  };
  // change status
  const handleStatusToggle = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status =
      updatedTasks[index].status === "completed" ? "incomplete" : "completed";
    setTasks(updatedTasks);
  };
  // delete task
  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  // update task
  const handleEditTask = (index) => {
    setTaskName(tasks[index].name);
    setTaskPriority(tasks[index].priority);
    setEditIndex(index);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };
  const allTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  return (
    <Container>
      {/* form section */}
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        <Typography variant="h6">Add/Edit Task</Typography>
        <TextField
          label="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          fullWidth
          style={{ marginBottom: "10px" }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Priority</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={taskPriority}
            label="Priority"
            onChange={(e) => setTaskPriority(e.target.value)}
            style={{ marginBottom: "10px" }}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </Button>
      </Paper>

      {/* Header */}
      <AppBar position="static">
        <Tabs value={tabValue} onChange={handleChangeTab}>
          <Tab label="All Tasks" />
          <Tab label="Low Priority Tasks" />
          <Tab label="Medium Priority Tasks" />
          <Tab label="High Priority Tasks" />
        </Tabs>
      </AppBar>
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        {tabValue === 0 && (
          <div>
            <Typography variant="h6">All Tasks</Typography>
            <Typography>Total Tasks: {allTasksCount}</Typography>
            <Typography>Completed Tasks: {completedTasksCount}</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((task, index) => (
                    <TableRow key={index}>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>
                        <span>{task.status}</span>
                        <Switch
                          checked={task.status === "completed"}
                          onChange={() => handleStatusToggle(index)}
                        />
                      </TableCell>
                      <TableCell>{task.priority}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEditTask(index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteTask(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        {tabValue === 1 && (
          <div>
            <Typography variant="h6">Low Priority Tasks</Typography>
            {/* Render low priority tasks */}
          </div>
        )}
        {tabValue === 2 && (
          <div>
            <Typography variant="h6">Medium Priority Tasks</Typography>
            {/* Render medium priority tasks */}
          </div>
        )}
        {tabValue === 3 && (
          <div>
            <Typography variant="h6">High Priority Tasks</Typography>
            {/* Render high priority tasks */}
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default App;
