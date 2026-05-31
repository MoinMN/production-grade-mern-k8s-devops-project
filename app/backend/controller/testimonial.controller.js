import { sendVerificationEmailForTestimonial, NotifyFillTestimonial } from '../utility/emails.api.js';
import Testimonial from '../model/testimonial.model.js';
import cloudinary from '../config/Cloudinary.js';


export const Get = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    if (testimonials.length === 0) return res.status(200).json({ message: "No Client Testimonial Present!" });
    else return res.status(200).json(testimonials);
  } catch (error) {
    console.log(`Error while Getting Testimonial\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const GetApprove = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true });
    if (testimonials.length === 0) return res.status(200).json({ message: "No Client Testimonial Present!" });
    else return res.status(200).json({ testimonials });
  } catch (error) {
    console.log(`Error while Getting Testimonial\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Add = async (req, res) => {
  try {
    const { email, sendMail } = req.body;
    if (!email) return res.status(400).json({ message: "Client Email Required!" });

    const clientEmailExist = await Testimonial.findOne({ email: email });
    if (clientEmailExist) return res.status(406).json({ message: "Client Email Already Exist!" });

    await Testimonial.create({ email: email });
    if (sendMail) NotifyFillTestimonial(email);

    res.status(200).json({ message: "Client Email Successfully Saved!" });
  } catch (error) {
    console.log(`Error while Creating Testimonial\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Update = async (req, res) => {
  try {
    const { email, name, comment, code } = req.body;
    const image = req.files.profile;

    if (!email) return res.status(400).json({ message: "Client Email Required!" });
    if (!name) return res.status(400).json({ message: "Client Name Required!" });
    if (!comment) return res.status(400).json({ message: "Client Comment Required!" });
    if (!code) return res.status(400).json({ message: "OTP Required!" });

    const clientTestimonial = await Testimonial.findOne({ email: email });

    if (!clientTestimonial) return res.status(400).json({ message: "Client Email Not Matched in Database!" });

    if (code !== clientTestimonial.verificationCode) {
      return res.status(401).json({ message: "Invalid OTP, Unauthorized Access!" });
    }

    // checked if already approved then return
    if (clientTestimonial.isApproved) {
      return res.status(400).json({ message: "Your Testimonial is already approved!" });
    }

    const default_client_img_src = process.env.FRONTEND_URL + process.env.DEFAULT_CLIENT_IMG_SRC;

    // profile image received
    if (image) {
      // if profile store other than default
      if (clientTestimonial.profile !== default_client_img_src) {
        const publicId = clientTestimonial.profile.split("/").pop().split(".")[0];  // Extract public ID
        await cloudinary.uploader.destroy(`portfolio/client profiles/${publicId}`);
      }

      const base64Image = `data:${image.mimetype};base64,${image.data.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "portfolio/client profiles",
      });

      // update url in db
      clientTestimonial.profile = result.secure_url;
    }

    clientTestimonial.name = name;
    clientTestimonial.comment = comment;

    await clientTestimonial.save();

    return res.status(200).json({ message: "🎉 Testimonial Successfully Sent!" });
  } catch (error) {
    console.log(`Error while Updating Testimonial\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Delete = async (req, res) => {
  try {
    const { _id } = req.query;
    if (!_id) return res.status(400).json({ message: "Id didn't received in backend!" });

    const testimonial = await Testimonial.findById(_id);

    const default_client_img_src = process.env.FRONTEND_URL + process.env.DEFAULT_CLIENT_IMG_SRC;

    // if profile store other than default
    if (testimonial.profile !== default_client_img_src) {
      const publicId = testimonial.profile.split("/").pop().split(".")[0];  // Extract public ID
      await cloudinary.uploader.destroy(`portfolio/client profiles/${publicId}`);
    }

    const deletedTestimonial = await Testimonial.findByIdAndDelete(_id);

    if (!deletedTestimonial) return res.status(400).json({ message: "Client Testimonial Didn't Exist!" });
    res.status(200).json({ message: "Client Testimonial Successfully Deleted!" });
  } catch (error) {
    console.log(`Error while Deleting Testimonial\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const ToggleApprove = async (req, res) => {
  try {
    const { email, isChecked } = req.body;
    if (!email) return res.status(400).json({ message: "Email Required!" });

    const clientTestimonial = await Testimonial.findOne({ email: email });
    if (!clientTestimonial) return res.status(400).json({ message: "Client Email Not Matched in Database!" });

    clientTestimonial.isApproved = isChecked;
    await clientTestimonial.save();

    res.status(200).json({ message: `Client Testimonial Successfully ${clientTestimonial.isApproved ? 'Approved' : 'removed from approved list'}!` });
  } catch (error) {
    console.log(`Error while ToggleApprove Testimonial\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}


export const SaveVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email Required!" });

    const clientTestimonial = await Testimonial.findOne({ email: email });
    if (!clientTestimonial) return res.status(400).json({ success: false, message: "Unauthorised Email Request!" });

    // checked if already approved then return
    if (clientTestimonial.isApproved) {
      return res.status(400).json({ message: "Your Testimonial is already approved!" });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    clientTestimonial.verificationCode = code;

    // send email by nodemailer
    sendVerificationEmailForTestimonial(email, code);

    await clientTestimonial.save();

    return res.status(200).json({ success: true, message: 'Verification Code Sent Successfully!' });
  } catch (error) {
    console.log(`Error while saving Verification code Testimonial\nError => `, error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error!", error: error.message });
  }
}

export const VerifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return res.status(400).json({ message: "Email & Code Required!", isAuth: false });

    const clientTestimonial = await Testimonial.findOne({ email: email });
    if (!clientTestimonial) return res.status(400).json({ message: "Unauthorised Email Request!", isAuth: false });

    if (clientTestimonial.verificationCode === code) return res.status(200).json({ message: "OTP Matched Successfully!", isAuth: true });
    else return res.status(400).json({ message: "OTP Not Matched!", isAuth: false });
  } catch (error) {
    console.log(`Error while Verifing Code Testimonial\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message, isAuth: false });
  }
}

