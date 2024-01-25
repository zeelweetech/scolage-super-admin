import styled from "styled-components";
import eye from "../assets/icons8-hide-30.png";
import eyeShow from "../assets/icons8-eye-30.png";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 25px;
  label {
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: #000000;
    padding-bottom: 10px;
  }

  input {
    padding: 15px 40px 15px 20px;
    border: 1px solid #707070;
    border-radius: 15px;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    color: #000;
    outline: none;

    &::placeholder {
      text-transform: capitalize;
    }
  }

  .password-toggle {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    height: 25px;
    width: 25px;
    cursor: pointer;
  }
`;

const FormInput = ({
  title,
  type,
  name = "",
  placeholder,
  id,
  onTogglePassword,
}) => {
  return (
    <Wrapper>
      <label htmlFor={id}>{title}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        required
      />
      {type === "password" && onTogglePassword && (
        <img
          src={eye}
          alt=""
          className="password-toggle"
          onClick={onTogglePassword}
        />
      )}

      {type === "text" && onTogglePassword && (
        <img
          src={eyeShow}
          alt="Toggle Password"
          className="password-toggle"
          onClick={onTogglePassword}
        />
      )}
    </Wrapper>
  );
};

export default FormInput;
