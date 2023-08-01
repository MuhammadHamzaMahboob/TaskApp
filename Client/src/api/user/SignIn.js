import { axiosInstance } from "../Axios";

const Signin = async (email, password) => {
  try {
    const response = await axiosInstance.post(`/login`, {
      email: email,
      password: password,
    });

    return response;
  } catch (err) {
    console.log("Signin error:", err);
    throw err; 
  }
};

export default Signin;
