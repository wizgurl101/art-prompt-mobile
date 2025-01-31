import axios from "axios";

async function authenticate(email, password) {
  const url = `http://localhost:5000/login`;

  const response = await axios.post(url, {
    email: email,
    password: password,
  });

  return response.data.idToken;
}

export async function createUser(email, password) {
  await authenticate("signUp", email, password);
}

export async function login(email, password) {
  await authenticate("signInWithPassword", email, password);
}
