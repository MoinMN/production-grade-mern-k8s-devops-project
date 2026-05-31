import axios from "axios";
import BASE_URL from "../config/BackendURL";

// for admin
export const GetTestimonial = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/testimonial/get`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log('Error While Getting Testimonial info!\nError => ', error);
  }
}

// for public
export const GetApprovedTestimonial = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/testimonial/get/approve`);
    return response.data;
  } catch (error) {
    console.log('Error While Getting Testimonial info!\nError => ', error);
  }
}

// for admin
export const AddTestimonial = async (email, sendMail) => {
  try {
    if (!email) return { message: "Email Required!" }
    const response = await axios.post(`${BASE_URL}/testimonial/add`, { email, sendMail }, { withCredentials: true });
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Adding Testimonial Info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}

// for admin
export const DeleteTestimonial = async (_id) => {
  try {
    if (!_id) throw new Error("Id Required!");
    const response = await axios.delete(`${BASE_URL}/testimonial/delete?_id=${_id}`, { withCredentials: true });
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Deleting Testimonial Info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}

// for admin
export const ToggleApprovedTestimonial = async (email, isChecked) => {
  try {
    if (!email) throw new Error("Email Required!");
    const response = await axios.put(`${BASE_URL}/testimonial/toggleapprove`,
      { email, isChecked },
      { withCredentials: true }
    );
    if (response?.data?.message) return { message: response.data.message }
  } catch (error) {
    console.log('Error While Toggle Approved Testimonial Info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}


//  ++++++++++++++ post testimonial ++++++++++++++ \\
// for clients
export const UpdateTestimonial = async (data) => {
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
    if (!data) throw new Error("All Fields Required!");
    const response = await axios.put(`${BASE_URL}/testimonial/update`, formData);
    return { status: response.status, message: response.data.message }
  } catch (error) {
    console.log('Error While Updating Testimonial Info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message }
    else return { message: error.response.statusText }
  }
}

export const SendVerificationCode = async (email) => {
  try {
    if (!email) throw new Error("Email Required!");
    const response = await axios.put(`${BASE_URL}/testimonial/send-verification-code`, { email });
    return { success: response.data.success, message: response.data.message }
  } catch (error) {
    console.log('Error While Sending Verification Code Testimonial Info!\nError => ', error);
    if (error?.response?.data?.message) return { success: error.response.data.success, message: error.response.data.message }
    else return { success: error.response.data.success, message: error.response.statusText }
  }
}

export const VerifyCode = async (email, code) => {
  try {
    if (!email || !code) throw new Error("Email & Code Required!");
    const response = await axios.put(`${BASE_URL}/testimonial/verify`, { email, code });
    if (response?.data?.message) return { message: response.data.message, isAuth: response.data?.isAuth }
  } catch (error) {
    console.log('Error While Sending Verification Code Testimonial Info!\nError => ', error);
    if (error?.response?.data?.message) return { message: error.response.data.message, isAuth: error.response.data?.isAuth }
    else return { message: error.response.statusText, isAuth: error.response.data?.isAuth }
  }
}
