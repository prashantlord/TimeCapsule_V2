import axios from "axios";

const getPrivateCapsules = async (id, status = "all") => {
  const user_id = String(id);
  const api_imp = import.meta.env.VITE_API_PRIVATEFETCH;
  try {
    const res = await axios.post(`${api_imp}`, {
      user_id,
      status,
    });

    return res.data;
  } catch (error) {
    return false;
  }
};

const createPrivateCapsule = async (payload) => {
  const token = JSON.parse(localStorage.getItem("auth_token"));
  if (!token) return false;
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_PRIVATECREATE}`,
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const openPrivateCapsule = async (payload) => {
  return true;
};

export { createPrivateCapsule, getPrivateCapsules, openPrivateCapsule };
