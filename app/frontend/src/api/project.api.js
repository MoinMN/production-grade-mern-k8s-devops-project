import axios from "axios";
import BASE_URL from "../config/BackendURL";

export const GetProject = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/project/get`);
    return response.data.projects;
  } catch (error) {
    console.log('Error While Getting Projects info!\nError => ', error);
  }
}

export const AddProject = async (data) => {
  const formData = new FormData();
  // Append individual fields 
  Object.keys(data).forEach((key) => {
    if (key === "image") {
      formData.append("image", data[key]); // Append file separately
    } else {
      formData.append(key, data[key]);
    }
  });

  try {
    const response = await axios.post(`${BASE_URL}/project/add`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Adding Project info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}

export const UpdateProject = async (data) => {
  const formData = new FormData();
  // Append individual fields 
  Object.keys(data).forEach((key) => {
    if (key === "image") {
      formData.append("image", data[key]); // Append file separately
    } else {
      formData.append(key, data[key]);
    }
  });

  try {
    const response = await axios.post(`${BASE_URL}/project/update`, formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Updating Project info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}

export const DeleteProject = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/project/delete`, { id }, { withCredentials: true });
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Deleting Project info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}

export const ChangeSequence = async (currentIndex, direction) => {
  try {
    await axios.post(`${BASE_URL}/project/change_sequence`, { currentIndex, direction }, { withCredentials: true });
  } catch (error) {
    console.log('Error While Changing Sequence of Project!\nError => ', error)
  }
}