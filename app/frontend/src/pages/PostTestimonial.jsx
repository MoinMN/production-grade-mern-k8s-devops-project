import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import { SendVerificationCode, UpdateTestimonial, VerifyCode } from '../api/clienttestimonial.api';
import Alert from '../components/Alert';

import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot, } from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Confetti from 'react-confetti';
import { Spinner } from 'react-bootstrap';
import { Helmet } from "react-helmet-async";

const PostTestimonial = () => {
  const [clientData, setClientData] = useState({
    email: '',
    code: '',
    name: '',
    comment: '',
  });

  const [isCodeSend, setIsCodeSend] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // alert 
  const [showAlert, setShowAlert] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [variantAlert, setVariantAlert] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientData.email || !clientData.code || !clientData.comment || !clientData.name) {
      setMessageAlert("All Field Required!");
      setVariantAlert("danger");
      setShowAlert(true);
      return;
    }
    if (!isVerified) {
      setMessageAlert("Verify Email First!");
      setVariantAlert("danger");
      setShowAlert(true);
      return;
    }
    // set true show loading
    setIsSubmitting(true);

    UpdateTestimonial(clientData)
      .then(res => {
        setMessageAlert(res.message);
        if (res.status === 200) {
          setVariantAlert("success");
          setIsSubmitted(true);   // setting submit ture to show submission
        }
        else {
          setVariantAlert("danger");
        }
      })
      .catch(err => {
        setMessageAlert(err.message);
        setVariantAlert("danger");
      })
      .finally(() => {
        setShowAlert(true);
        // set false remove show loading
        setIsSubmitting(false);
      });
  }

  const handleSendCode = () => {
    if (!clientData?.email) {
      setMessageAlert("Email Required!");
      setVariantAlert("danger");
      setShowAlert(true);
      return;
    }

    // set true show loading
    setIsSubmitting(true);

    SendVerificationCode(clientData?.email)
      .then(res => {
        setMessageAlert(res?.message);
        if (res?.success) {
          setVariantAlert("success");
          setIsCodeSend(true);
        } else {
          setVariantAlert("danger");
          setIsCodeSend(false);
        }
      })
      .catch(err => {
        setMessageAlert(err.message);
        setVariantAlert("danger");
      })
      .finally(() => {
        setShowAlert(true);
        // set false remove show loading
        setIsSubmitting(false);
      });
  }

  const handleVerifyCode = () => {
    if (!clientData?.code) {
      setMessageAlert("OTP Required!");
      setVariantAlert("danger");
      setShowAlert(true);
      return;
    }

    // set true show loading
    setIsSubmitting(true);

    VerifyCode(clientData?.email, clientData?.code)
      .then(res => {
        setMessageAlert(res?.message);
        setVariantAlert("success");
        if (res?.message === 'OTP Not Matched!') setVariantAlert("danger");
        setIsVerified(res?.isAuth);
      })
      .catch(err => {
        setMessageAlert(err?.message);
        setVariantAlert("danger");
        setIsVerified(err?.isAuth);
      })
      .finally(() => {
        setShowAlert(true);
        // set false remove show loading
        setIsSubmitting(false);
      })
  }

  const handleChange = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value
    });
    // ensure if email its isCodeSend false
    if (e.target.name === 'email') {
      setIsCodeSend(false);
      setIsVerified(false);
    }
  }

  const handleImageChange = (e) => setClientData((prev) => ({ ...prev, profile: e.target.files[0] }))

  return (
    <>
      <Helmet>
        <title>Submit Testimonial | Moin Naik</title>
        <meta
          name="description"
          content="Share your experience working with Moin Naik."
        />
      </Helmet>

      <div className="flex flex-col mx-auto h-screen justify-center max-lg:w-full max-lg:px-4 overflow-x-hidden overflow-y-auto bg-black text-white">
        {/* is form submitted */}
        {isSubmitted
          ? <>
            <div className="flex flex-col justify-center items-center gap-16 h-full w-full max-lg:gap-8">
              {/* Confetti Animation */}
              <Confetti width={window.innerWidth} height={window.innerHeight} />

              {/* Tick Mark */}
              <FontAwesomeIcon
                icon={faCircleCheck}
                bounce
                style={{ color: "#00ff00" }}
                className="h-32"
              />
              {/* Text */}
              <h3 className="text-2xl text-center lg:text-nowrap montserrat-alternates-semibold">
                Thank you for sharing your valuable feedback with us!
              </h3>
            </div>
          </>
          : <>
            <div
              className={`${isCodeSend
                ? isVerified
                  ? "w-full sm:w-10/12 md:w-3/4 lg:w-1/2"
                  : "w-full sm:w-10/12 md:w-2/3 lg:w-5/12"
                : "w-full sm:w-10/12 md:w-3/4 lg:w-1/2"
                } mx-auto transition-all duration-300 ease-in-out p-6 bg-slate-600/50 border border-white rounded-lg`}
            >
              <h1 className="text-2xl sm:text-3xl my-6 sm:my-8 text-center montserrat-alternates-semibold">Post Testimonial</h1>

              <div className="flex flex-col justify-center items-center gap-4">
                {/* Email & Send OTP */}
                {!isCodeSend && (
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className='bg-gray-800 w-full'
                      value={clientData?.email}
                      onChange={handleChange}
                    />
                    <Button
                      variant="secondary"
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                      onClick={handleSendCode}
                    >
                      Send OTP
                    </Button>
                  </div>
                )}

                {/* OTP & Verify Button */}
                {isCodeSend && !isVerified && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      name="code"
                      value={clientData?.code}
                      onChange={(e) => setClientData((prev) => ({ ...prev, code: e }))}
                      className="w-full sm:w-auto"
                    >
                      <InputOTPGroup>
                        {[...Array(6)].map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="bg-gray-800"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                    <Button
                      variant="secondary"
                      className="w-full sm:w-auto"
                      onClick={handleVerifyCode}
                      disabled={isSubmitting}
                    >
                      Verify
                    </Button>
                  </div>
                )}

                {/* Verified State */}
                {isVerified && (
                  <>
                    <div className="grid grid-flow-col gap-4 w-full">
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="bg-gray-800 w-full"
                        value={clientData?.email}
                        disabled
                      />
                      <span className="w-full sm:w-auto text-black bg-white flex justify-center items-center gap-2 rounded-md">
                        <i className="fa-solid fa-circle-check text-2xl" /> Verified
                      </span>
                    </div>

                    {/* Additional Inputs After Verification */}

                    <Input
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={clientData?.name}
                      onChange={handleChange}
                      className="bg-gray-800 w-full"
                    />
                    <div className="w-full">
                      <Label htmlFor="picture">Your Image to Showcase (optional):</Label>
                      <Input
                        id="picture"
                        name="profile"
                        type="file"
                        className="bg-gray-800 w-full text-white file:bg-gray-800 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-md"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                    <Textarea
                      placeholder="Message"
                      name="comment"
                      value={clientData?.comment}
                      onChange={handleChange}
                      className="bg-gray-800 w-full"
                    />
                    <Button
                      variant="secondary"
                      type="submit"
                      className="w-fit px-12 py-2 mx-auto"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? <>
                          <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="mr-2"
                          />
                          Submitting...
                        </>
                        : "Submit"
                      }
                    </Button>
                  </>
                )}
              </div>
            </div>
          </>
        }
      </div>


      {/* alert  */}
      < Alert
        variant={variantAlert}
        showAlert={showAlert}
        message={messageAlert}
        setShowAlert={setShowAlert}
      />
    </>
  )
}

export default PostTestimonial
