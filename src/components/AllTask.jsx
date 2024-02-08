import {
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AllTask = ({
  msg,
  tasks,
  allTasksCount,
  completedTasksCount,
  handleDeleteTask,
  handleEditTask,
  handleStatusToggle,
}) => {
  return (
    <div>
      {msg === "all" ? (
        <div>
          <Typography color={"blue"} fontWeight={"bold"}>
            Total Tasks: {allTasksCount}
          </Typography>
          <Typography color={"green"} fontWeight={"bold"}>
            Completed Tasks: {completedTasksCount}
          </Typography>
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
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>
                    <span>{task.status}</span>
                  </TableCell>
                  <TableCell>{task.priority}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default AllTask;
