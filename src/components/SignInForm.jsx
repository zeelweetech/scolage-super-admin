import styled from "styled-components";
import FormInput from "./FormInput";
import CustomCheckbox from "./CustomCheckbox";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useLoadingBar } from "../context/LoadingBarContext";
import React, { useEffect } from "react";
// import eye from "../assets/icons8-hide-30.png"

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 618px;

  .form-title {
    position: relative;
    padding-bottom: 29px;

    h2 {
      font-weight: 400;
      font-size: 30px;
      line-height: 40px;
      color: #000000;
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 30px;
      height: 1px;
      background-color: #707070;
    }
  }

  .signin-form {
    padding-top: 30px;

    .form-inputs {
      display: flex;
      gap: 32px;
    }

    .form-cta {
      display: flex;
      align-items: center;
      gap: 20px;
      padding-bottom: 40px;
    }

    a {
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #60269e;
    }
    .submit-btn {
      width: 300px;
    }
  }
  @media (max-width: 992px) {
    .signin-form {
      .form-inputs {
        flex-direction: column;
        gap: 0;
      }
    }
  }
`;

const SignInForm = () => {
  const { verifyAuth, auth } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const getLogin = async (email, password) => {
    const toastId = toast.loading("Signing in...");
    try {
      const { data, status, statusText } = await axios.post(
        "/v2/login/superAdmin",
        {
          email,
          password,
          role: "superadmin",
        }
      );
      localStorage.setItem("allowPrivate", status + statusText);
      localStorage.setItem("token", data.token);
      document.cookie = `jwtToken=${data.token}`;
      await verifyAuth();
      navigate("/dashboard");
      toast.dismiss(toastId);
      toast.success("Sign in successful");
    } catch (err) {
      console.log(err.message);
      toast.dismiss(toastId);
      toast.error("Incorrect Email or Password !!");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    getLogin(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Wrapper>
      <div className="form-title">
        <h2>Sign In</h2>
      </div>

      <form className="signin-form" onSubmit={handleFormSubmit}>
        <div className="form-inputs">
          <FormInput
            title={"Your email"}
            name="email"
            type={"email"}
            placeholder={"Tonynguyen@example.com"}
            id={"email"}
          />
          <FormInput
            title={"Password"}
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder={"password"}
            id={"password"}
            onTogglePassword={togglePasswordVisibility}
          />
        </div>
        <div className="form-cta">
          <CustomCheckbox />
          <Link to="/forgot">Forgot password?</Link>
        </div>
        <div className="submit-btn">
          <Button type={"submit"}>Sign In</Button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SignInForm;
