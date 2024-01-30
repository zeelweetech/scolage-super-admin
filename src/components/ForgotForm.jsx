import styled from "styled-components";
import FormInput from "./FormInput";
import Button from "./Button";
// import { TfiAngleLeft } from "react-icons/tfi";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 618px;

  .inner {
    max-width: 400px;
  }

  .form-title {
    h2 {
      font-weight: 400;
      font-size: 30px;
      line-height: 40px;
      color: #000000;
      padding-bottom: 18px;
    }

    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #7a86a1;
    }
  }

  .signin-form {
    padding-top: 30px;
    max-width: 358px;

    .form-inputs {
      display: flex;
      gap: 32px;
    }

    a {
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #60269e;
    }
  }

  .back-cta {
    padding-top: 36px;

    a {
      svg {
        font-size: 30px;
      }
      display: flex;
      align-items: center;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #60269e;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
  }
`;

const ForgotForm = () => {
  const [page, setPage] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPassword((prev) => !prev);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setEmail(e.target.email.value);
    const toastId = toast.loading("Send OTP...");
    const body = { email: e.target.email.value };
    try {
      const { data } = await axios.post("/v2/forgotpass/web", body);
      toast.dismiss(toastId);
      setPage(1);
      toast.success("Send otp successful");
    } catch (err) {
      console.log(err.message);
      toast.dismiss(toastId);
      toast.error("Incorrect Email !!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Verify OTP...");
    const body = { email: email, otp: e.target.otp.value };
    try {
      const { data } = await axios.post("/v2/verify/otp", body);
      toast.dismiss(toastId);
      setPage(2);
      toast.success("Verify otp successful");
    } catch (err) {
      console.log(err.message);
      toast.dismiss(toastId);
      toast.error("Incorrect otp !!");
    }
  };

  const handleNewPassword = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Verify OTP...");
    const body = {
      email: email,
      newpassword: e.target.newPassword.value,
      confirmpassword: e.target.confirmPassword.value,
    };
    try {
      const { data } = await axios.post("/v2/forgot-password/superadmin", body);
      toast.dismiss(toastId);
      navigate("/signin");
      toast.success("Password change successful");
    } catch (err) {
      console.log(err);
      toast.dismiss(toastId);
      toast.error(err.response.data.error);
    }
  };

  const resendOtp = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Send OTP...");
    const body = { email: email };
    try {
      const { data } = await axios.post("/v2/forgotpass/web", body);
      toast.dismiss(toastId);
      toast.success("Send otp successful");
    } catch (err) {
      console.log(err.message);
      toast.dismiss(toastId);
      toast.error("Somthing went wrong!!");
    }
  };

  return (
    <Wrapper>
      <div className="inner">
        {page === 0 ? (
          <>
            <div className="form-title">
              <h2>Forgot password?</h2>
              <p>
                Enter the email address you used when you joined and we'll send
                you instructions to reset your password.
              </p>
            </div>

            <form className="signin-form" onSubmit={handleSendOtp}>
              <div className="form-inputs">
                <FormInput
                  title={"Your email"}
                  type={"email"}
                  placeholder={"Tonynguyen@example.com"}
                  id={"email"}
                  name={"email"}
                />
              </div>
              <Button type={"submit"}>Send OTP</Button>
            </form>
          </>
        ) : page === 1 ? (
          <>
            <div className="form-title">
              <h2>Enter Your OTP</h2>
              <p>
                Check the email address you used when you joined and Enter your
                OTP.
              </p>
            </div>

            <form className="signin-form" onSubmit={handleSubmit}>
              <div className="form-inputs">
                <FormInput
                  title={"Your OTP"}
                  type={"number"}
                  placeholder={"Enter your otp"}
                  id={"otp"}
                  name={"otp"}
                />
              </div>
              <div className="flex flex-row items-center justify-center text-center text-sm font-medium mb-3  space-x-1 text-gray-500">
                <p>Didn't recieve code?</p>
                <a
                  className="flex flex-row items-center text-blue-600 cursor-pointer"
                  onClick={(e) => resendOtp(e)}
                >
                  Resend
                </a>
              </div>
              <Button type={"submit"}>Submit</Button>
            </form>
          </>
        ) : page === 2 ? (
          <>
            <div className="form-title">
              <h2>Change Your Password</h2>
              <p>Enter your new password and confirm password.</p>
            </div>

            <form className="signin-form" onSubmit={handleNewPassword}>
              <div className="form-inputs">
                <FormInput
                  title={"New Password"}
                  type={showPassword ? "text" : "password"}
                  placeholder={"Enter your New Password"}
                  id={"newPassword"}
                  name={"newPassword"}
                  onTogglePassword={togglePasswordVisibility}
                />
              </div>
              <div className="form-inputs">
                <FormInput
                  title={"Confirm Password"}
                  type={confirmPassword ? "text" : "password"}
                  placeholder={"Enter your confirm Password"}
                  id={"confirmPassword"}
                  name={"confirmPassword"}
                  onTogglePassword={toggleConfirmPasswordVisibility}
                />
              </div>
              <Button type={"submit"}>Change Password</Button>
            </form>
          </>
        ) : (
          ""
        )}

        <div className="back-cta">
          <Link to="/signin">
            <RiArrowDropLeftLine /> Back to sign in
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default ForgotForm;
