import styled from "styled-components";
import AddIcon from "../Icons/AddIcon";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Wrapper = styled.div`
  .label {
    width: 100px;
    p {
      font-weight: 400;
      font-size: 15px;
      line-height: 20px;
      color: #000000;
      padding-top: 10px;
      text-transform: capitalize;
    }
  }

  .field {
    padding-left: 30px;
    width: calc(100% - 100px);
  }

  input {
    outline: none;
  }

  .form-ctas {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;

    button {
      background: #60269e;
      border-radius: 14px;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #ffffff;
      padding: 10px 40px;
    }
  }
`;

const ProfilePicStyles = styled.div`
  display: flex;
  padding-bottom: 28px;
  .label {
    width: 100px;
    p {
      font-weight: 400;
      font-size: 15px;
      line-height: 20px;
      color: #000000;
      padding-top: 10px;
    }
  }

  .field {
    .profile-avatar {
      border: 1px solid #707070;
      height: 150px;
      width: 150px;
      border-radius: 16px;
      position: relative;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
      .avatar-ctas {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 5px;
        gap: 5px;

        button {
          width: 50%;
          border: 1px solid #707070;
          background: #fff;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 400;
          font-size: 10px;
          line-height: 9px;
          color: #7a86a1;
          padding: 7px 9px;
        }
      }
    }
  }
`;

// const ProfilePicBlock = () => {
//    return (
//       <ProfilePicStyles>
//          <div className="label">
//             <p>Profile Picture</p>
//          </div>
//          <div className="field">
//             <div className="profile-avatar">
//                {/* <img src="" alt="" /> */}
//                <div className="avatar-ctas">
//                   <button>
//                      <AddIcon />
//                      <span>Add</span>
//                   </button>
//                   <button>
//                      <AddIcon />
//                      <span>Remove</span>
//                   </button>
//                </div>
//             </div>
//          </div>
//       </ProfilePicStyles>
//    );
// };

const InputFieldStyles = styled.div`
  display: flex;
  padding-bottom: 28px;

  .field {
    input {
      width: 100%;
      border: 1px solid #707070;
      border-radius: 16px;
      height: 45px;
      padding: 0 36px;
      font-weight: 400;
      font-size: 14px;
      line-height: 19px;
      color: #000;
    }
  }
`;

const InputField = ({ title, name, placeholder, value }) => {
  return (
    <InputFieldStyles>
      <div className="label">
        <p>{title}</p>
      </div>
      <div className="field">
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          defaultValue={value || ""}
        />
      </div>
    </InputFieldStyles>
  );
};

const ExperienceFieldStyles = styled.div`
  display: flex;
  padding-bottom: 28px;

  .field {
    display: flex;
    align-items: center;
    gap: 20px;
    .exp-drop {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      border: 1px solid #707070;
      border-radius: 16px;
      overflow: hidden;

      p.title {
        font-weight: 400;
        font-size: 15px;
        line-height: 20px;
        color: #7a86a1;
        text-transform: capitalize;
        padding: 6px 20px;
        border-right: 1px solid #7a86a1;
      }

      .p-dropdown {
        border: none;
        box-shadow: none;

        .p-dropdown-label {
          font-weight: 400;
          font-size: 14px;
          line-height: 19px;
          color: #707070;
          padding-right: 0;
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .field {
      flex-direction: column;
      align-items: start;
      .exp-drop {
        width: 100%;
        padding-inline: 15px;
        justify-content: flex-start;
      }
    }
  }
`;

const ExperienceField = ({
  totalExp,
  setTotalExp,
  exp,
  expOptionTemp,
  valueTemplate,
  currentExp,
  setCurrentExp,
}) => {
  return (
    <ExperienceFieldStyles>
      <div className="label">
        <p>Experience</p>
      </div>
      <div className="field">
        <div className="exp-drop total-xp">
          <p className="title">total</p>
          <Dropdown
            value={totalExp}
            onChange={(e) => setTotalExp(e.value)}
            options={exp}
            valueTemplate={valueTemplate}
            itemTemplate={expOptionTemp}
          />
        </div>
        <div className="exp-drop current-xp">
          <p className="title">current</p>
          <Dropdown
            value={currentExp}
            onChange={(e) => setCurrentExp(e.value)}
            options={exp}
            valueTemplate={valueTemplate}
            itemTemplate={expOptionTemp}
          />
        </div>
      </div>
    </ExperienceFieldStyles>
  );
};

const AboutFieldStyles = styled.div`
  display: flex;
  padding-bottom: 28px;
  .field {
    .about-textarea {
      border: 1px solid #707070;
      border-radius: 16px;
      overflow: hidden;
      height: 100px;

      textarea {
        height: 100%;
        width: 100%;
        resize: none;
        outline: none;
        padding: 5px 9px;
      }
    }
  }
`;

const AboutField = ({ value }) => {
  return (
    <AboutFieldStyles>
      <div className="label">
        <p>About</p>
      </div>
      <div className="field">
        <div className="about-textarea">
          <textarea name="about" defaultValue={value || ""}></textarea>
        </div>
      </div>
    </AboutFieldStyles>
  );
};

const expOptionTemp = (option) => {
  console.log("option", option);
  return (
    <p>
      {option} {option == 1 ? "year" : "years"}
    </p>
  );
};

const valueTemplate = (option) => {
  console.log("option", option);
  if (option) {
    return (
      <p>
        {option} {option == 1 ? "year" : "years"}
      </p>
    );
  }
};
const StaffForm = ({
  staffData,
  setStaffData,
  id,
  getCollegeDetails,
  editData,
  setEditData,
  setSelectedId,
}) => {
  const [totalExp, setTotalExp] = useState(10);
  const [currentExp, setCurrentExp] = useState(2);
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("");
  const exp = new Array(30).fill(1).map((item, index) => item + index);
  const inputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (editData?.staffid) {
      const TotleExp = editData?.experience?.[0]?.total;
      const CurrentExp = editData?.experience?.[0]?.current;
      setTotalExp(+TotleExp);
      setCurrentExp(+CurrentExp);
      setAvatarPreview(editData.url);
    } else {
      setAvatarPreview(null);
      setTotalExp(10);
      setCurrentExp(2);
    }
  }, [editData?.staffid]);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleOpenInput = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleRemoveAvatar = (e) => {
    e.preventDefault();
    inputRef.current.value = null;
    setAvatarPreview(null);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
    forceUpdate();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loading = toast.loading("Adding Details...");
    try {
      // const collegeId = localStorage.getItem("collegeId");
      const collegeId = id ? id : localStorage.getItem("collegeId");
      if (!collegeId) {
        toast.dismiss(loading);
        toast.error("College Id not found, Please add college details first.");
        return false;
      }

      const formData = new FormData();
      formData.append("collegeid", collegeId);
      formData.append("profilepicture", e.target.avatar.files[0]);
      formData.append("name", e.target.name.value);
      formData.append("qualification", e.target.qualification.value);
      formData.append("total", totalExp);
      formData.append("current", currentExp);
      formData.append("designation", e.target.designation.value);
      formData.append("about", e.target.about.value);

      console.log("formData", formData);

      if (editData?.staffid) {
        const { data } = await axios.patch(
          `/v2/edit/management_staffdetail/${editData?.staffid}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setStaffData([...staffData, data.data]);
        getCollegeDetails();
        window.location.reload();
        toast.dismiss(loading);
        toast.success("Details added successfully");
        if (id) {
          formRef.current.reset();
          setAvatarPreview(null);
        } else {
          // formRef.current.reset();
          // setAvatarPreview(null);
        }
      } else {
        const { data } = await axios.post(
          "/v2/reg/management_staffdetail",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setStaffData([...staffData, data.data]);
        getCollegeDetails();
        window.location.reload();
        toast.dismiss(loading);
        toast.success("Details added successfully");
        if (id) {
          formRef.current.reset();
          setAvatarPreview(null);
        } else {
          // formRef.current.reset();
          // setAvatarPreview(null);
        }
      }
    } catch (err) {
      console.log(err);
      toast.dismiss(loading);
      toast.error("something went wrong...");
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
      <Wrapper>
        <ProfilePicStyles>
          <div className="label">
            <p>Profile Picture</p>
          </div>
          <div className="field">
            <div className="profile-avatar">
              {avatarPreview && <img src={avatarPreview} alt="" />}
              <div className="avatar-ctas">
                <button type="button" onClick={handleOpenInput}>
                  <AddIcon />
                  <span>Add</span>
                </button>
                <input
                  ref={inputRef}
                  onChange={handleChange}
                  type="file"
                  accept="image/*"
                  name="avatar"
                  style={{ display: "none" }}
                />
                <button type="button" onClick={handleRemoveAvatar}>
                  <AddIcon />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </ProfilePicStyles>

        <InputField
          title={"name"}
          name="name"
          placeholder="Ravindar Narayana"
          value={editData?.staffid ? editData.name : ""}
        />
        <InputField
          title={"Qualification"}
          name="qualification"
          placeholder="PHD in Science"
          value={editData?.staffid ? editData.qualification : ""}
        />
        <ExperienceField
          totalExp={totalExp}
          setTotalExp={setTotalExp}
          currentExp={currentExp}
          setCurrentExp={setCurrentExp}
          exp={exp}
          expOptionTemp={expOptionTemp}
          valueTemplate={valueTemplate}
        />
        <InputField
          title={"Designation"}
          name="designation"
          placeholder="Science Teacher"
          value={editData?.staffid ? editData.designation : ""}
        />
        <AboutField value={editData?.staffid ? editData.about : ""} />

        <div className="form-ctas">
          {editData?.staffid && (
            <button
              className="cancel-btn-cta"
              onClick={() => {
                setEditData();
                setSelectedId();
              }}
            >
              Cancel
            </button>
          )}
          {/* <button>Add</button> */}
          <button type="submit">Save</button>
        </div>
      </Wrapper>
    </form>
  );
};

export default StaffForm;
