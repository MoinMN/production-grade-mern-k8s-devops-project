import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LuInstagram, LuMail } from "react-icons/lu";
import { BsSnapchat } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoTwitter, IoLogoGithub } from "react-icons/io";
import { SiMedium } from "react-icons/si";
import { SiTelegram } from "react-icons/si";
import { RiThreadsFill } from "react-icons/ri";
import Alert from "./Alert";
import { Add } from "@/api/contact.api";

const socialLinks = [
  { icon: <LuMail />, link: "mailto:moinnaik98@gmail.com" },
  { icon: <FaLinkedin />, link: "https://linkedin.com/in/moinnaik" },
  { icon: <IoLogoGithub />, link: "https://github.com/MoinMN" },
  { icon: <LuInstagram />, link: "https://www.instagram.com/im_moin45/" },
  { icon: <BsSnapchat />, link: "https://www.snapchat.com/add/im_moin45" },
  { icon: <IoLogoTwitter />, link: "https://x.com/MoinMN5" },
  { icon: <SiTelegram />, link: "https://t.me/im_moin45" },
  { icon: <RiThreadsFill />, link: "https://www.threads.net/@im_moin45" },
  { icon: <SiMedium />, link: "https://moinn.medium.com" },
];

const Contact = () => {
  const [contactData, setContactData] = useState({ name: "", email: "", number: "", subject: "", message: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [variantAlert, setVariantAlert] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDataChange = (e) => setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, number, subject, message } = contactData;

    if (!name || !email || !subject || !message) {
      setMessageAlert('Mandatory fields are empty!');
      setVariantAlert("warning");
      setShowAlert(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessageAlert("Please enter a valid email address!");
      setVariantAlert("warning");
      setShowAlert(true);
      return;
    }

    // Mobile number validation (10 digits only)
    const phoneRegex = /^[0-9]{10}$/;
    if (number && !phoneRegex.test(number)) {
      setMessageAlert("Please enter a valid 10-digit mobile number!");
      setVariantAlert("warning");
      setShowAlert(true);
      return;
    }

    setIsSubmitting(true);

    Add(contactData)
      .then((res) => {
        setMessageAlert(res.message);
        setVariantAlert("success");
      }).catch((err) => {
        setMessageAlert(err.message);
        setVariantAlert("danger");
      }).finally(() => {
        setShowAlert(true);
        setContactData({ name: "", email: "", number: "", subject: "", message: "" });
        setIsSubmitting(false);
      });
  };

  const [hoveredIcon, setHoveredIcon] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(x, [-50, 50], [10, -10]);
  const rotateY = useTransform(y, [-50, 50], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width);
    y.set(e.clientY - rect.top - rect.height);
  };

  return (
    <>
      <motion.section
        className="text-white md:my-16 px-6 md:px-24 scroll-mt-2 md:scroll-mt-8"
        id="contact"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h3
          className="montserrat-alternates-semibold text-3xl md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Get in <span className="text-blue-600">Touch</span>
        </motion.h3>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center py-8">
          {/* Left Side Note + Socials */}
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h4 className="text-xl md:text-2xl font-semibold text-blue-600">
              {` Let's Connect!`}
            </h4>
            <p className="mt-4 text-sm md:text-base text-gray-300">
              {"Let's bring your ideas to life! Whether it's a "}
              <span className="text-blue-500">project</span>, a{" "}
              <span className="text-blue-500">collaboration</span>, or just a
              friendly <span className="text-blue-500">hello</span>, {`I'd love to
              hear from you. Don't hesitate—let's connect and make something
              awesome happen!`}
            </p>

            <div className="flex max-md:gap-0 max-lg:gap-2 max-2xl:gap-3 mt-6 justify-center">
              {socialLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="p-2"
                  onMouseEnter={() => setHoveredIcon(index)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  onMouseMove={handleMouseMove}
                  style={{
                    x: hoveredIcon === index ? rotateY : 0,
                    y: hoveredIcon === index ? rotateX : 0,
                  }}
                  whileHover={{
                    scale: 1.3,
                    rotate: 10,
                    transition: { duration: 0.3, ease: "easeInOut" },
                  }}
                >
                  <span className="text-2xl md:text-3xl text-gray-400 hover:text-blue-500 transition-all duration-300 ease-in-out cursor-pointer">
                    {item.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="sm:w-4/5 md:w-1/2 bg-gray-900 p-4 md:p-8 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
              {["name", "email", "number", "subject", "message"].map((field) => (
                <motion.div
                  key={field}
                  whileFocus={{ scale: 1.02, boxShadow: "0px 0px 8px rgba(59, 130, 246, 0.7)" }}
                >
                  {field === "message" ? (
                    <Textarea name={field} value={contactData[field]} onChange={handleDataChange} placeholder="Message" className="bg-gray-800 text-slate-300" />
                  ) : (
                    <Input type={field === "email" ? "email" : "text"} name={field} value={contactData[field]} onChange={handleDataChange} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="bg-gray-800 text-slate-300" />
                  )}
                </motion.div>
              ))}

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white py-2 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </motion.section>

      <Alert
        variant={variantAlert}
        showAlert={showAlert}
        message={messageAlert}
        setShowAlert={setShowAlert}
      />
    </>
  );
};

export default Contact;
