import styled from "styled-components";
import EditIcon from "../Icons/EditIcon";
import { useState } from "react";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";

// const DropdownFieldStyles = styled.div`
//   display: flex;
//   align-items: center;
//   padding-bottom: 20px;

//   p {
//     width: 100px;
//     font-weight: 400;
//     font-size: 15px;
//     line-height: 20px;
//     color: #000000;
//     margin-right: 35px;
//   }

//   .dropdown-field {
//     width: calc(100% - 135px);

//     .p-dropdown {
//       width: 100%;
//       border: 1px solid #707070;
//       border-radius: 16px;
//       box-shadow: none;
//       .p-dropdown-label {
//         padding: 12px 20px;
//         font-weight: 400;
//         font-size: 15px;
//         line-height: 20px;
//         color: #7a86a1;
//         text-transform: capitalize;
//       }
//     }
//   }
// `;

// const DropdownField = ({ title, selected, setSelected, options }) => {
//   return (
//     <DropdownFieldStyles>
//       <p>{title}</p>
//       <div className="dropdown-field">
//         <Dropdown
//           optionLabel="name"
//           optionValue="name"
//           onChange={(e) => setSelected(e.value)}
//           value={selected}
//           options={options}
//         />
//       </div>
//     </DropdownFieldStyles>
//   );
// };

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 40px;
  padding-bottom: 40px;

  &:last-child {
    padding: 0px;
  }

  .login-info {
    width: 308px;
    border: 1px solid #707070;
    border-radius: 20px;
    text-align: center;
    padding: 20px;
    input {
      font-weight: 400;
      font-size: 20px;
      line-height: 27px;
      color: #7a86a1;
      display: flex;
    }
  }

  .edit-ctas {
    display: flex;
    align-items: center;
    gap: 70px;

    .edt1 {
      background: #60269e;
      border: 1px solid #707070;
      filter: drop-shadow(1.389px 7.878px 29px rgba(105, 95, 151, 0.141));
      font-weight: 400;
      font-size: 20px;
      line-height: 27px;
      color: #fefefe;
      border-radius: 20px;
      padding: 20px 40px;
    }

    .edt2 {
      background: #ffffff;
      border: 1px solid #707070;
      height: 66px;
      aspect-ratio: 1 / 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      filter: drop-shadow(1.389px 7.878px 29px rgba(105, 95, 151, 0.141));
    }
  }

  @media (min-width: 768px) and (max-width: 1280px) {
    gap: 20px;
    flex-wrap: wrap;

    .login-info {
      width: calc(50% - 20px);
      display: flex;
    }

    .edit-ctas {
      gap: 30px;
    }
  }

  @media (min-width: 1281px) and (max-width: 1440px) {
    gap: 20px;

    .edit-ctas {
      gap: 20px;
    }
  }

  @media (min-width: 1441px) and (max-width: 1600px) {
    gap: 20px;
    .edit-ctas {
      gap: 30px;
    }
  }
`;

const LoginId = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const collegeId = localStorage.getItem("collegeId");

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validation = () => {
    const newErrors = {};

    if (!values?.name) {
      newErrors.name = "Please enter your name";
    }

    if (!values?.email) {
      newErrors.email = "Please enter your email";
    } else if (!/^\S+@\S+\.\S+$/.test(values?.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!values?.password) {
      newErrors.password = "Please enter your password";
    }

    if (!values?.role) {
      newErrors.role = "Please select your role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        const body = {
          name: values?.name,
          email: values?.email,
          password: values?.password,
          role: values?.role,
          collegeid: collegeId,
        };
        const { data } = await axios.post(`/v2/add/team/clg`, body, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log("data", data);
        setValues({
          name: "",
          email: "",
          password: "",
          role: "",
        });
      } catch (err) {
        console.log(err);
        toast("Something went wrong, please try again");
      }
    }
  };
  console.log("values", values);

  return (
    <Wrapper>
      <input
        className="login-info user-id"
        type="text"
        name="name"
        placeholder="Name"
        onChange={(e) => handleOnChange(e)}
      />
      {errors?.name && (
        <p className="text-red-500 text-xs mb-1">{errors?.name}</p>
      )}

      <input
        className="login-info user-id"
        type="email"
        name="email"
        placeholder="Email"
        onChange={(e) => handleOnChange(e)}
      />
      {errors?.email && (
        <p className="text-red-500 text-xs mb-1">{errors?.email}</p>
      )}

      <input
        className="login-info user-password"
        type="password"
        name="password"
        placeholder="Password"
        onChange={(e) => handleOnChange(e)}
      />
      {errors?.password && (
        <p className="text-red-500 text-xs mb-1">{errors?.name}</p>
      )}

      <select
        className="login-info user-role"
        type="role"
        name="role"
        placeholder="Role"
        onChange={(e) => handleOnChange(e)}
      >
        <option value="">Role</option>
        <option value="clgadmin">College Admin</option>
        <option value="clgviewer">College Viewer</option>
        <option value="clgmoderator">College Moderator</option>
      </select>
      {errors?.role && (
        <p className="text-red-500 text-xs mb-1">{errors?.role}</p>
      )}

      <div className=" edit-ctas">
        <button
          className="edt1"
          type="submit"
          onClick={(e) => handleOnSubmit(e)}
        >
          Add
        </button>
        {/* <button className="edt2">
          <EditIcon />
        </button> */}
      </div>
    </Wrapper>
  );
};

export default LoginId;
