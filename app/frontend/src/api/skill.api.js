import axios from "axios";
import BASE_URL from "../config/BackendURL";

export const GetSkill = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/skill/get`);
    return response.data.skills;
  } catch (error) {
    console.log('Error While Getting Skills info!\nError => ', error);
  }
}

export const AddSkill = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/skill/add`, data, { withCredentials: true });
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Adding Skill info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}

export const UpdateSkill = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/skill/update`, data, { withCredentials: true });
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Updating Skill info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}

export const DeleteSkill = async (id) => {
  try {
    const response = await axios.post(`${BASE_URL}/skill/delete`, { id }, { withCredentials: true });
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Deleting Skill info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}

export const ChangeSequence = async (currentIndex, direction) => {
  try {
    await axios.post(`${BASE_URL}/skill/change_sequence`, { currentIndex, direction }, { withCredentials: true });
  } catch (error) {
    console.log('Error While Changing Sequence of Skills!\nError => ', error)
  }
}