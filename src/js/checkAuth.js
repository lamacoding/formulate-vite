import { serverUri } from "../backendServerConfig";

export const checkIsAuthenticated = async () => {
  let sessionId = localStorage.getItem("sessionId");

  if (!sessionId) {
    return false;
  }

  let response = await fetch(`${serverUri}/api/auth/session/${sessionId}`);
  let data = await response.json();

  console.log(data);

  return data;
};
