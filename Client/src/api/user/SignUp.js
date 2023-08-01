import { axiosInstance } from "../Axios";

const Signup = async (name, email, password,group) => {
  console.log(name, email, password);
  try {
    const res = await axiosInstance.post(`/signup`, {
      name: name,
      email: email,
      password: password,
      group: group
    });
    return res;
  } catch (err) {
    console.log(err,"error");
    throw err;
  }
};

export default Signup;
