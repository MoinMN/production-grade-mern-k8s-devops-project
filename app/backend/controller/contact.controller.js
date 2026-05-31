import Contact from "../model/contact.model.js";
import { NotifyContact } from "../utility/emails.api.js";

export const Get = async (req, res) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts);
  } catch (error) {
    console.log('error while getting contacts info => ', error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Delete = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) return res.status(404).json({ message: "Internal Server Error!" });

    const response = await Contact.findByIdAndDelete(_id);
    if (response !== null) {
      return res.status(200).json({ message: "Contact Data Deleted Successfully!" });
    } else {
      return res.status(403).json({ message: "Error While Deleting contact data!" });
    }
  } catch (error) {
    console.log(`Error while deleting contact data\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Add = async (req, res) => {
  try {
    const { name, email, number, subject, message } = req.body;
    if (!email || !name || !subject || !message) return res.status(404).json({ message: "Email, Name, Subject &  Message Required!" });

    const response = await Contact.create({ name, email, number, subject, message });

    if (!response) return res.status(403).json({ message: "Error While Adding contact data!" });

    // send mail to developer
    await NotifyContact({
      name: response.name,
      email: response.email,
      number: response.number,
      subject: response.subject,
      message: response.message
    });

    return res.status(200).json({ message: "Message sent to chief!" });
  } catch (error) {
    console.log(`Error while deleting contact data\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}