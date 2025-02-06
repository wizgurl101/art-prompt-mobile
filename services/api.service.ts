import axios from "axios";

async function authenticate(email, password) {
  const url = `http://192.168.1.67:5000/login`;

  const response = await axios.post(url, {
    email: email,
    password: password,
  });

  return response.data;
}

export async function login(email, password) {
  return await authenticate(email, password);
}

export async function getPrompt(token) {
  const default_prompt = "a tree";
  const url = "http://192.168.1.67:5000/prompt";

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.art_prompt;
  } catch (error) {
    console.error(error);
    return default_prompt;
  }
}
