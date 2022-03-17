import axios from "axios";

const csrfAxiosApi = async (path, token, configuration, apiRootLink) => {
  const config = configuration || {};
  const bl = apiRootLink || process.env.REACT_APP_BACKEND_LINK;
  const cfg = {
    url: bl + "/api" + path,
    headers: {
      "csrf-token": token,
    },
    method: "POST",
    withCredentials: true,
    ...config,
  };
  let response = {};
  try {
    const data = await axios(cfg);
    response = data;
  } catch (err) {
    throw err;
  }
  return response;
};

export default csrfAxiosApi;
