import axios from "axios";
const getUser = async () => {
  const role = JSON.parse(localStorage.getItem("auth_role"));
  const token = JSON.parse(localStorage.getItem("auth_token"));

  if (!role || !token) return false;
  const endpoint =
    role === "admin"
      ? "http://127.0.0.1:8000/api/admin"
      : "http://127.0.0.1:8000/api/user";
  try {
    const res = await axios.get(`${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const login = async (email, password) => {
  const payload = {
    email,
    password,
  };
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/login", payload);

    localStorage.setItem("auth_role", JSON.stringify(res.data.role));
    localStorage.setItem("auth_token", JSON.stringify(res.data.token));

    const user_validation = await getUser();
    if (user_validation) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const register = async (username, email, password) => {
  const payload = {
    username,
    email,
    password,
  };
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/register", payload);

    localStorage.setItem("auth_role", JSON.stringify(res.data.role));
    localStorage.setItem("auth_token", JSON.stringify(res.data.token));

    const user_validation = await getUser();
    if (user_validation) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const logoutUser = async () => {
  return token;
};

export { login, register, getUser, logoutUser };
