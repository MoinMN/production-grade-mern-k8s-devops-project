import axios from "axios";
import BASE_URL from "../config/BackendURL";


export const AuthUser = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/verify`, { withCredentials: true });

    if (response.data.isAuthenticated) {
      return { isAuthenticated: true, navigate: false }
    } else {
      return { isAuthenticated: false, navigate: true }
    }
  } catch {
    // console.log('Error While Verifing Authentication!\nError => ', error);
    return { isAuthenticated: false, navigate: true }
  }
}


export const Logout = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log('Error While Logouting User!\nError => ', error);
  }
}