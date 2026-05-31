import axios from "axios";
import BASE_URL from "../config/BackendURL";

export const GetAboutMe = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/aboutme/get`);
    return response.data;
  } catch (error) {
    console.log('Error While Getting About me info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}

export const UpdateAboutMe = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/aboutme/update`, data, { withCredentials: true });
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Updating About me info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}