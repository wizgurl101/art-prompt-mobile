import { LOGIN_URL } from "@env";
import axios from "axios";

async function authenticate(email, password) {
  const url = `${LOGIN_URL}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
  });

  return response.data.idToken;
}

export async function login(email, password) {
  await authenticate(email, password);
}
