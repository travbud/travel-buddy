import React, { useState } from "react";
import "./SignInModal.css";
import iconImage from "../assets/travelBuddyIcon.png";
import googleIcon from "../assets/googleIcon.png";
import fbIcon from "../assets/fbIcon.png";
import appleIcon from "../assets/appleIcon.png";
import phoneIcon from "../assets/phoneIcon.png";
import emailIcon from "../assets/emailIcon.png";

const SignInModal = ({ setSignInModalOpen, setVRegModalOpen }) => {
  const [usePhone, setUsePhone] = useState(false);

  //toggle between phone and email button
  const handlePhoneToggle = () => {
    setUsePhone((prevUsePhone) => !usePhone);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSignInModalOpen(false);
    setVRegModalOpen(true);
  };

  return (
    <>
      <div className="title-container">
        <img className="main-icon" src={iconImage} alt="Icon" />
        <h2 className="main-title">TRAVEL BUDDY</h2>
      </div>

      <div className="body-container">
        <div className="sign-in-form-div">
          <h3>Sign In/Sign Up</h3>
          <form onSubmit={handleSubmit}>
            {usePhone ? (
              <>
                <div className="phone-div">
                  <label>Country / Region</label>
                  <select name="phoneCode" className="phoneCodes" required>
                    <option value="+91">+91 (India)</option>
                    <option value="+1">+1 (US)</option>
                  </select>
                  <label>Phone Number</label>
                  <input
                    name="phoneNumber"
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="email-div">
                  <label>Email ID</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email Id"
                    required
                  />
                </div>
                <div className="password-div">
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </>
            )}
            <button className="button-1" type="submit">
              REGISTER
            </button>
          </form>
        </div>

        {/*different sign in options*/}
        <div className="btns-div">
          <h5>OR</h5>
          <button className="button-2">
            <img src={googleIcon} className="google-icon" alt="Google Icon" />
            <span>Sign In with Google</span>
          </button>
          <button className="button-2">
            <img src={fbIcon} className="fb-icon" alt="Facebook Icon" />
            <span>Sign In with Facebook</span>
          </button>
          <button className="button-2">
            <img src={appleIcon} className="apple-icon" alt="Apple Icon" />
            <span>Sign In with Apple</span>
          </button>
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
