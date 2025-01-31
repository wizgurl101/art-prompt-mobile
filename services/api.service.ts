import axios from "axios";

async function authenticate(email, password) {
  const url = `http://192.168.1.67:5000/login`;

  const response = await axios.post(url, {
    email: email,
    password: password,
  });

  return response.data.token;
}

export async function login(email, password) {
  await authenticate(email, password);
}
