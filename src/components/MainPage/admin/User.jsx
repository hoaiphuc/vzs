import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  Switch,
} from "@mui/material";

const useStyles = styled({
    container: {
      maxHeight: 440,
      margin: "16px",
    },
    cell: {
      padding: "16px",
      fontSize: "14px"
    }
  });

const users = [
  { id: 1, name: "John Doe", email: "johndoe@example.com", isActive: true },
  { id: 2, name: "Jane Smith", email: "janesmith@example.com", isActive: false },
  // Add more users as needed
];

const UserTable = () => {
  const classes = useStyles();
  const [userList, setUserList] = useState(users);

  const handleActivate = (id) => {
    const updatedUsers = userList.map((user) =>
      user.id === id ? { ...user, isActive: !user.isActive } : user
    );
    setUserList(updatedUsers);
  };

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className={classes.cell}>ID</TableCell>
            <TableCell className={classes.cell}>Name</TableCell>
            <TableCell className={classes.cell}>Email</TableCell>
            <TableCell className={classes.cell}>Active</TableCell>
            <TableCell className={classes.cell}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user) => (
            <TableRow key={user.id}>
              <TableCell className={classes.cell}>{user.id}</TableCell>
              <TableCell className={classes.cell}>{user.name}</TableCell>
              <TableCell className={classes.cell}>{user.email}</TableCell>
              <TableCell className={classes.cell}>
                <Switch
                  checked={user.isActive}
                  onChange={() => handleActivate(user.id)}
                  color="primary"
                />
              </TableCell>
              <TableCell className={classes.cell}>
                <Box className={classes.buttonContainer}>
                  <Button variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary">
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {userList.length === 0 && (
        <Box p={2}>
          <Typography>No users found.</Typography>
        </Box>
      )}
    </TableContainer>
  );
};

export default UserTable;