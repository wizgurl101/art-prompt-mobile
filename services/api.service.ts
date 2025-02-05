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

export async function getPrompt(token) {
  const url = "http://192.168.1.67:5000/prompt";

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(JSON.stringify(response));
  console.log(response.data.art_prompt);

  return response.data.art_prompt;
}
