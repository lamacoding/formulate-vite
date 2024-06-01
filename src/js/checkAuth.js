import {serverUri} from "../backendServerConfig";

export const checkIsAuthenticated = async () => {
  let sessionId = localStorage.getItem('sessionId');

  let response = await fetch(`${serverUri}/api/auth/session/${sessionId}`);
  let data = await response.json();

  console.log(data);

  return data;
}