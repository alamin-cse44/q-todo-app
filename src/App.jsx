import { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import AllTask from "./components/AllTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskStatus, setTaskStatus] = useState("incomplete");
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
          status: taskStatus,
          priority: taskPriority,
        };
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        setTasks([
          ...tasks,
          { name: taskName, status: taskStatus, priority: taskPriority },
        ]);
      }
      setTaskName("");
      setTaskPriority("");
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
    setTaskStatus(tasks[index].status);
    setTaskPriority(tasks[index].priority);
    setEditIndex(index);
  };

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  // filtering
  const allTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const lowP = tasks.filter((task) => task.priority === "low");
  const mediumP = tasks.filter((task) => task.priority === "medium");
  const highP = tasks.filter((task) => task.priority === "high");
  return (
    <Container>
      {/* form section */}
      <Paper sx={{ padding: "20px", marginTop: "20px", mx: { sm: 18 } }}>
        <Typography variant="h6" mb={2}>
          Add/Edit Task
        </Typography>
        <TextField
          label="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          fullWidth
          style={{ marginBottom: "20px" }}
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
      <AppBar
        position="static"
        sx={{ background: "transparent", mt: 2, boxShadow: "none" }}
      >
        <Tabs value={tabValue} onChange={handleChangeTab} variant="scrollable">
          <Tab label="All Tasks" />
          <Tab label="Low Priority Tasks" />
          <Tab label="Medium Priority Tasks" />
          <Tab label="High Priority Tasks" />
        </Tabs>
      </AppBar>
      {/* content */}
      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        {tabValue === 0 && (
          <AllTask
            msg={"all"}
            tasks={tasks}
            allTasksCount={allTasksCount}
            completedTasksCount={completedTasksCount}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            handleStatusToggle={handleStatusToggle}
          />
        )}
        {tabValue === 1 && (
          <div>
            <Typography variant="h6">Low Priority Tasks</Typography>
            <AllTask
              msg={""}
              tasks={lowP}
              allTasksCount={allTasksCount}
              completedTasksCount={completedTasksCount}
              handleDeleteTask={handleDeleteTask}
              handleEditTask={handleEditTask}
              handleStatusToggle={handleStatusToggle}
            />
          </div>
        )}
        {tabValue === 2 && (
          <div>
            <Typography variant="h6">Medium Priority Tasks</Typography>
            <AllTask
              msg={""}
              tasks={mediumP}
              allTasksCount={allTasksCount}
              completedTasksCount={completedTasksCount}
              handleDeleteTask={handleDeleteTask}
              handleEditTask={handleEditTask}
              handleStatusToggle={handleStatusToggle}
            />
          </div>
        )}
        {tabValue === 3 && (
          <div>
            <Typography variant="h6">High Priority Tasks</Typography>
            <AllTask
              msg={""}
              tasks={highP}
              allTasksCount={allTasksCount}
              completedTasksCount={completedTasksCount}
              handleDeleteTask={handleDeleteTask}
              handleEditTask={handleEditTask}
              handleStatusToggle={handleStatusToggle}
            />
          </div>
        )}
      </Paper>
    </Container>
  );
}

export default App;
