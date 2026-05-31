import axios from "axios";
import BASE_URL from "../config/BackendURL";

export const Get = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/contact/get`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log('Error While Getting Contact info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    return { message: "Internal Server Error!" }
  }
}

export const Delete = async (_id) => {
  try {
    const response = await axios.post(`${BASE_URL}/contact/delete`, { _id }, { withCredentials: true });
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Deleting Contact info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    return { message: "Internal Server Error!" }
  }
}

export const Add = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/contact/add`, data);
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Adding Contact info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    return { message: "Internal Server Error!" }
  }
}