import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  useGetAllUsersQuery,
  useModifySpecificUserMutation,
} from "../redux/admin/adminApi";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  const { data: users, isLoading, error, refetch } = useGetAllUsersQuery();
  const [modifyUser] = useModifySpecificUserMutation();
  const navigate = useNavigate();

  const handleToggleAdmin = async (id) => {
    const user = users.find((user) => user.id === id);
    const action = user.isAdmin ? "demote" : "promote";

    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        // Call modifyUser mutation
        await modifyUser({ userId: id, isAdmin: !user.isAdmin }).unwrap();
        alert(`User ${action}d successfully.`);
        refetch(); //Refresh the users page to trigger a re-render
      } catch (error) {
        console.error("Failed to update user", error);
        alert("Failed to update user");
      }
      // setUsers((prevUsers) =>
      //   prevUsers.map((user) =>
      //     user.id === id ? { ...user, isAdmin: !user.isAdmin } : user
      //   )
      // );
    }
  };

  // const handleDeleteUser = (id) => {
  //   const user = users.find((user) => user.id === id);
  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete user ${user.firstname} ${user.lastname}? This action cannot be undone.`
  //     )
  //   ) {
  //     setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  //   }
  // };

  return (
    <Box className="main-box" align="center" px={20}>
      <Typography variant="h4" gutterBottom>
        All Users
      </Typography>

      {/* Andrew- added button to go back to dashboard */}
      <Button
        variant="contained"
        color="secondary"
        sx={{ mr: 2 }}
        onClick={() => navigate("/admin")}
      >
        Back to Dashboard
      </Button>

      {isLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography variant="body1" color="error">
          Error loading users.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid item xs={12} key={user.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">
                    <strong>
                      {user.firstname} {user.lastname}
                    </strong>
                  </Typography>
                  <Typography variant="body1">
                    <strong>Username:</strong> {user.username}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
                  </Typography>

                  {user.address && (
                    <>
                      <Typography variant="body1">
                        <strong>Address:</strong>
                      </Typography>
                      <Typography variant="body2">
                        {user.address.street1}
                        {user.address.street2
                          ? ", " + user.address.street2
                          : ""}
                      </Typography>
                      <Typography variant="body2">
                        {user.address.city}, {user.address.state},{" "}
                        {user.address.country}
                      </Typography>
                      <Typography variant="body2">
                        {user.address.zipcode}
                      </Typography>
                    </>
                  )}

                  <Button
                    variant="contained"
                    color={user.isAdmin ? "secondary" : "primary"}
                    onClick={() => handleToggleAdmin(user.id)}
                    sx={{ marginTop: "10px", marginRight: "10px" }}
                  >
                    {user.isAdmin ? "Demote from Admin" : "Promote to Admin"}
                  </Button>

                  {/* <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                    sx={{ marginTop: "10px" }}
                  >
                    Delete User
                  </Button> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default AllUsers;
