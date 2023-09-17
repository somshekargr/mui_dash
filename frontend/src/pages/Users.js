import React from "react";
import Breadcrums from "../components/Breadcrums";
import UsersList from "../components/UsersList";
import { Typography } from "@mui/material";
import { getAuthToken } from "../util/auth";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";

function Users() {
  const { users } = useLoaderData();
  return (
    <>
      <Breadcrums title="Users" />
      <Typography
        sx={{
          p: 2,
          mb: 2,
          backgroundColor: "white",
          borderRadius: "10px",
          boxSizing: "border-box",
          boxShadow: "0px 0px 10px silver",
        }}
        component="div"
        variant="div"
      >
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={users}>
            {(loadedUsers) => <UsersList users={loadedUsers} />}
          </Await>
        </Suspense>
      </Typography>
    </>
  );
}

export default Users;

async function loadusers() {
  const token = getAuthToken();
  const response = await fetch("http://localhost:8080/users", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not fetch profle details." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.users;
  }
}

export async function loader() {
  return defer({
    users: await loadusers(),
  });
}
