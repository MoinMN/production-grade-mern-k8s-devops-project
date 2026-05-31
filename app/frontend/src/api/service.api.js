import axios from "axios";
import BASE_URL from "../config/BackendURL";

export const GetServices = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/service/get`);
    return response?.data?.services;
  } catch (error) {
    console.log('Error While Getting Services info!\nError => ', error);
  }
}

export const AddService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/service/add`, data, { withCredentials: true });
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Adding Service info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}

export const UpdateService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/service/update`, data, { withCredentials: true });
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Updating Service info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}

export const DeleteService = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/service/delete`, { id }, { withCredentials: true });
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Deleting Service info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}

export const ChangeSequence = async (currentIndex, direction) => {
  try {
    await axios.post(`${BASE_URL}/service/change_sequence`, { currentIndex, direction }, { withCredentials: true });
  } catch (error) {
    console.log('Error While Changing Sequence of Service!\nError => ', error)
  }
}