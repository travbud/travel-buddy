import React, { useState } from "react";
import "./VendorSignInModal.css";
import iconImage from "../assets/travelBuddyIcon.png";
import phoneIcon from "../assets/mobileIcon.svg";
import emailIcon from "../assets/emailIcon.svg";
import { Flex, Input, Typography } from "antd";

const SignInModal = ({ setSignInModalOpen, setVRegModalOpen }) => {
  const [usePhone, setUsePhone] = useState(true);
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneCode, setPhoneCode] = useState("+91");
  const [errors, setErrors] = useState({});

  //ant d otp field
  const onChange = (text) => {
    setOtp(text);
  };
  const sharedProps = {
    onChange,
  };

  //handle phone and email toggle
  const handlePhoneToggle = () => {
    setUsePhone((prevUsePhone) => !prevUsePhone);
    setOtpGenerated(false);
    setOtp("");
    setErrors({});
  };

  const handleOtpGenerate = () => {
    const newErrors = {};
    if (usePhone) {
      if (!phoneNumber) {
        newErrors.phoneNumber = "Please enter phone number.";
      }
    } else {
      if (!emailId) {
        newErrors.emailId = "Please enter email Id.";
      }
    }

    if (Object.keys(newErrors).length === 0) {
      setOtpGenerated(true);
    } else {
      setOtpGenerated(false);
    }
    setErrors(newErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = { ...errors };

    if (!otpGenerated) {
      newErrors.otp = "Generate OTP first.";
      setErrors(newErrors);
      return;
    }

    if (!otp) {
      newErrors.otp = "Please fill out this field.";
      setErrors(newErrors);
      return;
    }

    setErrors(newErrors);

    const formData = {
      otp,
      ...(usePhone ? { phoneCode, phoneNumber } : { emailId }),
    };

    try {
      const response = await fetch("api_endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Success:", await response.json());
        setSignInModalOpen(false);
        setVRegModalOpen(true);
      } else {
        console.error("Error:", await response.json());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="title-container">
        <img className="main-icon" src={iconImage} alt="Icon" />
        <h2 className="main-title">TRAVEL BUDDY</h2>
      </div>

      <div className="body-container">
        <div className="sign-in-form-div">
          <h3>Log In</h3>
          <form onSubmit={handleSubmit}>
            {usePhone ? (
              <>
                <div className="phone-div">
                  <label>Country / Region</label>
                  <select
                    name="phoneCode"
                    className="phoneCodes"
                    value={phoneCode}
                    onChange={(e) => setPhoneCode(e.target.value)}
                    required
                  >
                    <option value="+91">+91 (India)</option>
                    <option value="+1">+1 (US)</option>
                  </select>
                  <label>Phone Number</label>
                  <input
                    name="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                  {errors.phoneNumber && (
                    <span className="error-message">{errors.phoneNumber}</span>
                  )}
                </div>
                <button
                  type="button"
                  className="otp-button"
                  onClick={handleOtpGenerate}
                >
                  {otpGenerated ? "Regenerate OTP" : "Generate OTP"}
                </button>
                {otpGenerated && (
                  <div className="otp-div">
                    <label>OTP</label>
                    <Flex gap="middle" align="flex-start" vertical>
                      <Input.OTP
                        formatter={(str) => str.toUpperCase()}
                        {...sharedProps}
                      />
                    </Flex>
                    {errors.otp && (
                      <span className="error-message">{errors.otp}</span>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="email-div">
                  <label>Email ID</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email Id"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    required
                  />
                  {errors.emailId && (
                    <span className="error-message">{errors.emailId}</span>
                  )}
                </div>

                <button
                  type="button"
                  className="otp-button"
                  onClick={handleOtpGenerate}
                >
                  {otpGenerated ? "Regenerate OTP" : "Generate OTP"}
                </button>
                {otpGenerated && (
                  <div className="otp-div">
                    <label>OTP</label>
                    <Flex gap="middle" align="flex-start" vertical>
                      <Input.OTP
                        formatter={(str) => str.toUpperCase()}
                        {...sharedProps}
                      />
                    </Flex>
                    {errors.otp && (
                      <span className="error-message">{errors.otp}</span>
                    )}
                  </div>
                )}
              </>
            )}
            <button className="button-1" type="submit">
              LOGIN
            </button>
          </form>
        </div>

        <div className="btns-div">
          <h5>OR</h5>
          <button className="button-2" onClick={handlePhoneToggle}>
            <img
              src={usePhone ? emailIcon : phoneIcon}
              className={usePhone ? "email-icon" : "phone-icon"}
              alt={usePhone ? "Email Icon" : "Phone Icon"}
            />
            <span>
              {usePhone ? "Continue with Email" : "Continue with Phone"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SignInModal;
