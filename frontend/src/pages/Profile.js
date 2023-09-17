import React from "react";
import ProfileView from "../components/ProfileView";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import { Suspense } from "react";
import Breadcrums from "../components/Breadcrums";
import { getAuthToken } from "../util/auth";
function Profile() {
  const { profile } = useLoaderData('profileId');
  return (
    <>
      <Breadcrums title="Profile" />

      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={profile}>
          {(loadedProfile) => <ProfileView profile={loadedProfile} />}
        </Await>
      </Suspense>
    </>
  );
}

export default Profile;

async function loadProfile(id) {
  const token = getAuthToken();
  const response = await fetch("http://localhost:8080/users/" + id, {
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
    return resData.user;
  }
}

export async function loader({ request, params }) {
  const id = params.profileId;

  return defer({
    profile: await loadProfile(id),
  });
}
